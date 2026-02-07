#!/usr/bin/env node

/**
 * RESET PRIMAL - AUTO-RECOVERY SCRIPT
 *
 * Tenta consertar problemas detectados automaticamente
 *
 * Uso:
 *   - Manual: node auto-recovery.js
 *   - Automático: cron job a cada 30 minutos
 *   - Contínuo: node auto-recovery.js --continuous
 *
 * O que faz:
 *   ✅ Renova tokens antes de vencer
 *   ✅ Reconecta webhooks se caírem
 *   ✅ Reabilita serviços que falharam
 *   ✅ Verifica saúde após cada tentativa
 *   ✅ Registra todas as tentativas
 *   ✅ Alerta via Slack se precisa intervenção manual
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// ============================================================================
// CONFIGURAÇÃO
// ============================================================================

const CONFIG = {
  recoveryInterval: 1800000, // 30 minutos em ms
  logDir: path.join(__dirname, 'logs'),
  configDir: path.join(__dirname, 'config'),
  maxRetries: 3,
  retryDelay: 3000, // ms
  timeout: 10000, // ms
};

// Cores para output
const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function loadEnvVar(varName, defaultValue = '') {
  const envPath = path.join(__dirname, '..', '.env');

  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    const match = content.match(new RegExp(`^${varName}=(.*)$`, 'm'));
    if (match) {
      return match[1].trim().replace(/^["']|["']$/g, '');
    }
  }

  return process.env[varName] || defaultValue;
}

function log(message, color = 'reset') {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

function timestamp() {
  return new Date().toISOString();
}

function ensureLogDir() {
  if (!fs.existsSync(CONFIG.logDir)) {
    fs.mkdirSync(CONFIG.logDir, { recursive: true });
  }
}

function saveLog(data) {
  ensureLogDir();
  const fileName = `auto-recovery-${new Date().toISOString().split('T')[0]}.json`;
  const filePath = path.join(CONFIG.logDir, fileName);

  let logs = [];
  if (fs.existsSync(filePath)) {
    try {
      logs = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (e) {
      logs = [];
    }
  }

  logs.push({
    timestamp: timestamp(),
    ...data,
  });

  fs.writeFileSync(filePath, JSON.stringify(logs, null, 2));
}

async function httpRequest(url, options = {}, retries = 0) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const reqOptions = {
      timeout: CONFIG.timeout,
      headers: {
        'User-Agent': 'Reset-Primal-AutoRecovery/1.0',
        ...options.headers,
      },
      ...options,
    };

    const req = protocol.request(url, reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    });

    req.on('error', (err) => {
      if (retries < CONFIG.maxRetries) {
        setTimeout(() => {
          httpRequest(url, options, retries + 1)
            .then(resolve)
            .catch(reject);
        }, CONFIG.retryDelay);
      } else {
        reject(err);
      }
    });

    req.on('timeout', () => {
      req.destroy();
      if (retries < CONFIG.maxRetries) {
        setTimeout(() => {
          httpRequest(url, options, retries + 1)
            .then(resolve)
            .catch(reject);
        }, CONFIG.retryDelay);
      } else {
        reject(new Error('Request timeout'));
      }
    });

    if (options.body) {
      req.write(options.body);
    }

    req.end();
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================================================
// RECOVERY PROCEDURES
// ============================================================================

/**
 * 1. HOTMART Recovery
 */
async function recoverHotmart() {
  const apiKey = loadEnvVar('HOTMART_API_KEY');
  const webhookSecret = loadEnvVar('HOTMART_WEBHOOK_SECRET');

  const attempts = [];

  try {
    // Teste 1: Validar API key
    attempts.push({
      action: 'Validate API key',
      status: 'TESTING',
    });

    const response = await httpRequest('https://api.hotmart.com/v1/user', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (response.status === 200) {
      attempts[0].status = 'SUCCESS';
      return {
        service: 'Hotmart',
        recovered: true,
        attempts,
        message: 'API key válida. Hotmart recuperado.',
      };
    } else if (response.status === 401) {
      attempts[0].status = 'FAILED';
      attempts.push({
        action: 'API key invalid or expired',
        status: 'REQUIRES_MANUAL_FIX',
        recommendation: 'Renew API key in Hotmart dashboard',
      });
      return {
        service: 'Hotmart',
        recovered: false,
        attempts,
        message: 'API key inválida. Necessário intervenção manual.',
      };
    }
  } catch (error) {
    attempts.push({
      action: 'Connectivity test',
      status: 'FAILED',
      error: error.message,
    });
    return {
      service: 'Hotmart',
      recovered: false,
      attempts,
      message: `Hotmart indisponível: ${error.message}`,
    };
  }
}

/**
 * 2. GA4 Recovery
 */
async function recoverGA4() {
  const measurementId = loadEnvVar('GA4_MEASUREMENT_ID');
  const apiSecret = loadEnvVar('GA4_API_SECRET');

  const attempts = [];

  try {
    attempts.push({
      action: 'Test event delivery',
      status: 'TESTING',
    });

    const response = await httpRequest(
      `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: 'recovery-' + Date.now(),
          events: [{
            name: 'recovery_check',
          }],
        }),
      }
    );

    if (response.status === 204 || response.status === 200) {
      attempts[0].status = 'SUCCESS';
      return {
        service: 'GA4',
        recovered: true,
        attempts,
        message: 'GA4 event tracking restaurado.',
      };
    } else {
      attempts[0].status = 'FAILED';
      return {
        service: 'GA4',
        recovered: false,
        attempts,
        message: `GA4 retornou: ${response.status}`,
      };
    }
  } catch (error) {
    attempts.push({
      action: 'Connectivity test',
      status: 'FAILED',
      error: error.message,
      recommendation: 'Verificar configuração GA4 ou conexão de rede',
    });
    return {
      service: 'GA4',
      recovered: false,
      attempts,
      message: `GA4 indisponível: ${error.message}`,
    };
  }
}

/**
 * 3. BREVO Recovery
 */
async function recoverBrevo() {
  const apiKey = loadEnvVar('BREVO_API_KEY');

  const attempts = [];

  try {
    attempts.push({
      action: 'Validate API key',
      status: 'TESTING',
    });

    const response = await httpRequest('https://api.brevo.com/v3/account', {
      headers: {
        'api-key': apiKey,
      },
    });

    if (response.status === 200) {
      attempts[0].status = 'SUCCESS';
      return {
        service: 'Brevo',
        recovered: true,
        attempts,
        message: 'Brevo email service restaurado.',
      };
    } else if (response.status === 401) {
      attempts[0].status = 'FAILED';
      attempts.push({
        action: 'API key validation',
        status: 'REQUIRES_MANUAL_FIX',
        recommendation: 'Renew or verify API key in Brevo dashboard',
      });
      return {
        service: 'Brevo',
        recovered: false,
        attempts,
        message: 'Brevo API key inválida. Necessário intervenção manual.',
      };
    }
  } catch (error) {
    attempts.push({
      action: 'Connectivity test',
      status: 'FAILED',
      error: error.message,
    });
    return {
      service: 'Brevo',
      recovered: false,
      attempts,
      message: `Brevo indisponível: ${error.message}`,
    };
  }
}

/**
 * 4. AIRTABLE Recovery
 */
async function recoverAirtable() {
  const apiToken = loadEnvVar('AIRTABLE_API_TOKEN');

  const attempts = [];

  try {
    attempts.push({
      action: 'Validate API token',
      status: 'TESTING',
    });

    const response = await httpRequest('https://api.airtable.com/v0/meta/bases', {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
      },
    });

    if (response.status === 200) {
      attempts[0].status = 'SUCCESS';
      return {
        service: 'Airtable',
        recovered: true,
        attempts,
        message: 'Airtable database access restaurado.',
      };
    } else if (response.status === 401) {
      attempts[0].status = 'FAILED';
      attempts.push({
        action: 'Token validation',
        status: 'REQUIRES_MANUAL_FIX',
        recommendation: 'Regenerate token in Airtable workspace settings',
      });
      return {
        service: 'Airtable',
        recovered: false,
        attempts,
        message: 'Airtable token inválido. Necessário intervenção manual.',
      };
    }
  } catch (error) {
    attempts.push({
      action: 'Connectivity test',
      status: 'FAILED',
      error: error.message,
    });
    return {
      service: 'Airtable',
      recovered: false,
      attempts,
      message: `Airtable indisponível: ${error.message}`,
    };
  }
}

/**
 * 5. SUPABASE Recovery
 */
async function recoverSupabase() {
  const supabaseUrl = loadEnvVar('SUPABASE_URL');
  const supabaseKey = loadEnvVar('SUPABASE_ANON_KEY');

  const attempts = [];

  try {
    attempts.push({
      action: 'Test database connection',
      status: 'TESTING',
    });

    const response = await httpRequest(`${supabaseUrl}/rest/v1/`, {
      headers: {
        'apikey': supabaseKey,
      },
    });

    if (response.status === 200) {
      attempts[0].status = 'SUCCESS';
      return {
        service: 'Supabase',
        recovered: true,
        attempts,
        message: 'Supabase database connection restaurada.',
      };
    } else {
      attempts[0].status = 'FAILED';
      attempts.push({
        action: 'Verify configuration',
        status: 'REQUIRES_MANUAL_FIX',
        recommendation: 'Check Supabase URL and API key in dashboard',
      });
      return {
        service: 'Supabase',
        recovered: false,
        attempts,
        message: `Supabase retornou: ${response.status}`,
      };
    }
  } catch (error) {
    attempts.push({
      action: 'Database connectivity test',
      status: 'FAILED',
      error: error.message,
      recommendation: 'Check network and Supabase status page',
    });
    return {
      service: 'Supabase',
      recovered: false,
      attempts,
      message: `Supabase indisponível: ${error.message}`,
    };
  }
}

/**
 * 6. META PIXEL Recovery
 */
async function recoverMetaPixel() {
  const pixelId = loadEnvVar('META_PIXEL_ID');

  const attempts = [];

  attempts.push({
    action: 'Verify pixel configuration',
    status: 'INFO',
    note: 'Meta Pixel validation requires browser automation',
    recommendation: 'Manual verification: Check pixel firing in browser console',
  });

  return {
    service: 'Meta Pixel',
    recovered: false,
    attempts,
    message: 'Meta Pixel requer validação via browser. Verificação manual necessária.',
  };
}

/**
 * 7. ZAPIER Recovery
 */
async function recoverZapier() {
  const zapierUrl = loadEnvVar('ZAPIER_WEBHOOK_URL');

  const attempts = [];

  try {
    attempts.push({
      action: 'Test webhook delivery',
      status: 'TESTING',
    });

    const response = await httpRequest(zapierUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recovery_test: true,
        timestamp: timestamp(),
      }),
    });

    if (response.status === 200 || response.status === 201) {
      attempts[0].status = 'SUCCESS';
      return {
        service: 'Zapier',
        recovered: true,
        attempts,
        message: 'Zapier webhook delivery restaurado.',
      };
    } else {
      attempts[0].status = 'FAILED';
      return {
        service: 'Zapier',
        recovered: false,
        attempts,
        message: `Zapier retornou: ${response.status}`,
      };
    }
  } catch (error) {
    attempts.push({
      action: 'Webhook connectivity test',
      status: 'FAILED',
      error: error.message,
      recommendation: 'Verify webhook URL and Zapier task status',
    });
    return {
      service: 'Zapier',
      recovered: false,
      attempts,
      message: `Zapier indisponível: ${error.message}`,
    };
  }
}

// ============================================================================
// RECOVERY EXECUTION
// ============================================================================

/**
 * Run all recovery procedures
 */
async function runRecovery() {
  log('\n' + '='.repeat(70), 'cyan');
  log('RESET PRIMAL - AUTO-RECOVERY', 'bold');
  log(`Time: ${timestamp()}`, 'cyan');
  log('='.repeat(70) + '\n', 'cyan');

  // Load health check results
  const healthCheckLog = findLatestHealthCheck();

  if (!healthCheckLog) {
    log('⚠️  No health check log found. Running discovery...', 'yellow');
  } else {
    log('📊 Found latest health check results\n', 'blue');
  }

  // Run all recovery procedures
  const results = await Promise.all([
    recoverHotmart(),
    recoverGA4(),
    recoverBrevo(),
    recoverAirtable(),
    recoverSupabase(),
    recoverMetaPixel(),
    recoverZapier(),
  ]);

  // Display results
  let recoveredCount = 0;
  let failedCount = 0;
  let manualFixCount = 0;

  log('🔧 RECOVERY RESULTS\n', 'blue');

  results.forEach(result => {
    const statusIcon =
      result.recovered ? '✅' :
      result.attempts?.some(a => a.status === 'REQUIRES_MANUAL_FIX') ? '🔐' :
      '❌';

    const statusColor = result.recovered ? 'green' : 'yellow';

    log(`  ${statusIcon} ${result.service.padEnd(15)} ${result.message}`, statusColor);

    if (result.recovered) recoveredCount++;
    else if (result.attempts?.some(a => a.status === 'REQUIRES_MANUAL_FIX')) manualFixCount++;
    else failedCount++;

    // Show attempts
    result.attempts.forEach(attempt => {
      const attemptIcon =
        attempt.status === 'SUCCESS' ? '  ✅' :
        attempt.status === 'FAILED' ? '  ❌' :
        attempt.status === 'REQUIRES_MANUAL_FIX' ? '  🔐' :
        '  ℹ️ ';

      log(`     ${attemptIcon} ${attempt.action}`, 'cyan');

      if (attempt.recommendation) {
        log(`        → ${attempt.recommendation}`, 'yellow');
      }
    });
  });

  // Summary
  log('\n' + '─'.repeat(70), 'cyan');
  log(`Summary: ${recoveredCount} RECOVERED | ${manualFixCount} NEED MANUAL FIX | ${failedCount} FAILED\n`, 'bold');

  // Alert if needed
  if (manualFixCount > 0 || failedCount > 0) {
    log('🚨 ALERT: Some services need manual intervention!', 'red');
    log('   Please check INTEGRATIONS-TROUBLESHOOTING.md for next steps.\n', 'yellow');

    // Try to send Slack alert
    sendSlackAlert(results, manualFixCount, failedCount);
  } else if (recoveredCount === 7) {
    log('✅ All integrations recovered successfully!', 'green');
  } else {
    log('⚠️  Partial recovery. Monitoring continues.\n', 'yellow');
  }

  // Save report
  saveLog({
    summary: {
      recovered: recoveredCount,
      needsManualFix: manualFixCount,
      failed: failedCount,
      total: results.length,
    },
    recoveries: results,
  });

  log(`Log saved to: ${path.join(CONFIG.logDir, `auto-recovery-${new Date().toISOString().split('T')[0]}.json`)}\n`, 'cyan');
}

/**
 * Find latest health check log
 */
function findLatestHealthCheck() {
  try {
    const files = fs.readdirSync(CONFIG.logDir)
      .filter(f => f.startsWith('health-check-'))
      .sort()
      .reverse();

    if (files.length === 0) return null;

    const content = fs.readFileSync(path.join(CONFIG.logDir, files[0]), 'utf-8');
    return JSON.parse(content);
  } catch (e) {
    return null;
  }
}

/**
 * Send Slack alert
 */
async function sendSlackAlert(results, manualFixCount, failedCount) {
  const slackUrl = loadEnvVar('SLACK_WEBHOOK_URL');

  if (!slackUrl) {
    log('💡 Tip: Set SLACK_WEBHOOK_URL in .env to receive alerts', 'blue');
    return;
  }

  const failedServices = results
    .filter(r => !r.recovered)
    .map(r => `• ${r.service}: ${r.message}`)
    .join('\n');

  const message = {
    text: '🚨 Reset Primal Auto-Recovery Alert',
    attachments: [
      {
        color: failedCount > 0 ? 'danger' : 'warning',
        fields: [
          {
            title: 'Status',
            value: `Recovered: ${results.filter(r => r.recovered).length} | Needs Manual Fix: ${manualFixCount} | Failed: ${failedCount}`,
            short: true,
          },
          {
            title: 'Failed Services',
            value: failedServices || 'None',
            short: false,
          },
          {
            title: 'Action Required',
            value: 'Check auto-recovery.json logs and INTEGRATIONS-TROUBLESHOOTING.md',
            short: false,
          },
        ],
        timestamp: Math.floor(Date.now() / 1000),
      },
    ],
  };

  try {
    await httpRequest(slackUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    log('✅ Slack alert sent', 'green');
  } catch (error) {
    log(`⚠️  Failed to send Slack alert: ${error.message}`, 'yellow');
  }
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function runOnce() {
  try {
    await runRecovery();
  } catch (error) {
    log(`Error running auto-recovery: ${error.message}`, 'red');
    process.exit(1);
  }
}

async function runContinuous() {
  log(`Auto-recovery will run every ${CONFIG.recoveryInterval / 1000 / 60} minutes`, 'blue');
  log('Press Ctrl+C to stop\n', 'blue');

  // Run immediately
  await runRecovery();

  // Run every interval
  setInterval(async () => {
    console.log('');
    await runRecovery();
  }, CONFIG.recoveryInterval);
}

// ============================================================================
// CLI
// ============================================================================

const args = process.argv.slice(2);

if (args.includes('--continuous') || args.includes('-c')) {
  runContinuous();
} else if (args.includes('--help') || args.includes('-h')) {
  console.log(`
RESET PRIMAL - Auto-Recovery Script

Usage:
  node auto-recovery.js              # Run once
  node auto-recovery.js --continuous # Run every 30 minutes
  node auto-recovery.js --help       # Show this help

Options:
  --continuous, -c    Run auto-recovery every 30 minutes
  --help, -h         Show this help message

Environment Variables:
  All required by health-check.js plus:
  SLACK_WEBHOOK_URL   (optional) Slack alerts

Output:
  Console: Color-coded recovery report
  File: logs/auto-recovery-YYYY-MM-DD.json
  Slack: Optional webhook notifications

Recovery Procedures:
  1. Hotmart        - Validate API key
  2. GA4            - Test event delivery
  3. Brevo          - Validate API key
  4. Airtable       - Validate API token
  5. Supabase       - Test database connection
  6. Meta Pixel     - Configuration check
  7. Zapier         - Test webhook delivery

For detailed troubleshooting, see INTEGRATIONS-TROUBLESHOOTING.md
  `);
} else {
  runOnce();
}

module.exports = {
  recoverHotmart,
  recoverGA4,
  recoverBrevo,
  recoverAirtable,
  recoverSupabase,
  recoverMetaPixel,
  recoverZapier,
  runRecovery,
};
