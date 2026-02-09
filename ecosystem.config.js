module.exports = {
  apps: [
    // Health Check: Monitora status de todas as integrações a cada 1 hora
    {
      name: 'reset-primal-health-check',
      script: './infrastructure/health-check.js',
      args: '--continuous',
      instances: 1,
      exec_mode: 'fork',
      cwd: '/Users/acacioamaro/RESET-PRIMAL-MVP',
      env: {
        NODE_ENV: 'production',
      },
      // Logs
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      out_file: './infrastructure/logs/health-check-pm2.log',
      error_file: './infrastructure/logs/health-check-pm2-error.log',
      // Auto-restart
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      // Monitoring
      instances: 1,
      execution_mode: 'cluster_mode',
    },

    // Auto-Recovery: Tenta consertar problemas a cada 30 minutos
    {
      name: 'reset-primal-auto-recovery',
      script: './infrastructure/auto-recovery.js',
      args: '--continuous',
      instances: 1,
      exec_mode: 'fork',
      cwd: '/Users/acacioamaro/RESET-PRIMAL-MVP',
      env: {
        NODE_ENV: 'production',
      },
      // Logs
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      out_file: './infrastructure/logs/auto-recovery-pm2.log',
      error_file: './infrastructure/logs/auto-recovery-pm2-error.log',
      // Auto-restart
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      // Monitoring
      instances: 1,
      execution_mode: 'cluster_mode',
    },
  ],
};
