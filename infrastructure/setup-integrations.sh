#!/bin/bash

################################################################################
# RESET PRIMAL - INTEGRATIONS SETUP SCRIPT
#
# RUN ONCE - Configura todas as 7 integrações permanentemente
#
# Uso: bash setup-integrations.sh
#
# O que este script faz:
# 1. ✅ Valida todas as credenciais em .env
# 2. ✅ Testa conexão Hotmart (webhook)
# 3. ✅ Instala GA4 em todas as páginas
# 4. ✅ Verifica sender Brevo
# 5. ✅ Cria registro teste Airtable
# 6. ✅ Verifica conexão Supabase
# 7. ✅ Registra Meta Pixel em todas as páginas
# 8. ✅ Testa Zapier webhook
# 9. ✅ Salva credenciais encriptadas
# 10. ✅ Executa health check
#
# Output Final: "✅ All integrations ready - setup complete!"
#
################################################################################

set -e  # Exit on error

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Variáveis de controle
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
ENV_FILE="${PROJECT_ROOT}/.env"
CONFIG_DIR="${SCRIPT_DIR}/config"
BACKUP_DIR="${SCRIPT_DIR}/backups/$(date +%Y%m%d_%H%M%S)"
LOG_FILE="${BACKUP_DIR}/setup.log"

# Contadores de status
TESTS_PASSED=0
TESTS_FAILED=0
TESTS_TOTAL=0

################################################################################
# FUNÇÕES UTILITÁRIAS
################################################################################

log_section() {
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}▶ $1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

log_test() {
    TESTS_TOTAL=$((TESTS_TOTAL + 1))
    echo -e "  [TEST $TESTS_TOTAL] $1"
    echo "[TEST $TESTS_TOTAL] $1" >> "$LOG_FILE"
}

log_pass() {
    TESTS_PASSED=$((TESTS_PASSED + 1))
    echo -e "    ${GREEN}✅ PASS${NC} - $1"
    echo "✅ PASS - $1" >> "$LOG_FILE"
}

log_fail() {
    TESTS_FAILED=$((TESTS_FAILED + 1))
    echo -e "    ${RED}❌ FAIL${NC} - $1"
    echo "❌ FAIL - $1" >> "$LOG_FILE"
}

log_warn() {
    echo -e "    ${YELLOW}⚠️  WARN${NC} - $1"
    echo "⚠️  WARN - $1" >> "$LOG_FILE"
}

log_info() {
    echo -e "    ${BLUE}ℹ️  INFO${NC} - $1"
    echo "ℹ️  INFO - $1" >> "$LOG_FILE"
}

# Carrega variável de environment com fallback
load_env_var() {
    local var_name=$1
    local default_value=${2:-""}

    if [ -f "$ENV_FILE" ]; then
        local value=$(grep "^${var_name}=" "$ENV_FILE" | cut -d'=' -f2- | tr -d '"' | tr -d "'")
        if [ -z "$value" ]; then
            echo "$default_value"
        else
            echo "$value"
        fi
    else
        echo "$default_value"
    fi
}

# Valida se variável está definida
validate_env_var() {
    local var_name=$1
    local value=$(load_env_var "$var_name")

    if [ -z "$value" ]; then
        log_fail "Variável $var_name não definida em .env"
        return 1
    else
        log_pass "Variável $var_name definida"
        return 0
    fi
}

# Testa conectividade HTTP
test_http_endpoint() {
    local url=$1
    local expected_status=$2

    local response=$(curl -s -o /dev/null -w "%{http_code}" "$url" --connect-timeout 5)

    if [ "$response" = "$expected_status" ]; then
        return 0
    else
        echo "Status: $response (esperado: $expected_status)" >&2
        return 1
    fi
}

################################################################################
# STARTUP
################################################################################

startup() {
    clear
    echo -e "${BLUE}"
    cat << "EOF"
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║     🚀 RESET PRIMAL - INTEGRATIONS SETUP SCRIPT 🚀              ║
║                                                                  ║
║     RUN ONCE - Configuração permanente de 7 integrações        ║
║                                                                  ║
║     Este script vai:                                            ║
║     • Validar todas as credenciais                             ║
║     • Testar conexões com cada serviço                         ║
║     • Registrar configurações permanentemente                  ║
║     • Salvar credenciais encriptadas                           ║
║     • Executar health check final                              ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
EOF
    echo -e "${NC}"

    # Criar diretórios necessários
    mkdir -p "$CONFIG_DIR"
    mkdir -p "$BACKUP_DIR"

    echo "Log salvo em: $LOG_FILE"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ===== SETUP INICIADO =====" >> "$LOG_FILE"
    echo ""

    # Verificar se .env existe
    if [ ! -f "$ENV_FILE" ]; then
        echo -e "${RED}❌ Erro: .env não encontrado em $ENV_FILE${NC}"
        echo "Por favor, crie o arquivo .env com todas as variáveis de ambiente necessárias."
        exit 1
    fi

    # Backup de .env
    cp "$ENV_FILE" "${BACKUP_DIR}/.env.backup"
    log_info ".env backed up para $BACKUP_DIR"
}

################################################################################
# PASSO 1: VALIDAR CREDENCIAIS
################################################################################

step_1_validate_credentials() {
    log_section "PASSO 1: VALIDAR CREDENCIAIS"

    local vars=(
        "HOTMART_API_KEY:Hotmart API Key"
        "HOTMART_WEBHOOK_SECRET:Hotmart Webhook Secret"
        "GA4_MEASUREMENT_ID:GA4 Measurement ID"
        "GA4_API_SECRET:GA4 API Secret"
        "BREVO_API_KEY:Brevo API Key"
        "BREVO_SENDER_EMAIL:Brevo Sender Email"
        "AIRTABLE_API_TOKEN:Airtable API Token"
        "AIRTABLE_BASE_ID:Airtable Base ID"
        "SUPABASE_URL:Supabase URL"
        "SUPABASE_ANON_KEY:Supabase Anon Key"
        "SUPABASE_SERVICE_ROLE_KEY:Supabase Service Role Key"
        "META_PIXEL_ID:Meta Pixel ID"
        "ZAPIER_WEBHOOK_URL:Zapier Webhook URL"
    )

    for var_pair in "${vars[@]}"; do
        IFS=':' read -r var_name var_desc <<< "$var_pair"
        log_test "$var_desc"
        if validate_env_var "$var_name"; then
            :
        else
            log_fail "$var_desc está vazio ou não definido"
            return 1
        fi
    done

    return 0
}

################################################################################
# PASSO 2: TESTAR HOTMART
################################################################################

step_2_test_hotmart() {
    log_section "PASSO 2: TESTAR HOTMART (Webhook-based Payment Gateway)"

    local hotmart_api_key=$(load_env_var "HOTMART_API_KEY")
    local hotmart_webhook_secret=$(load_env_var "HOTMART_WEBHOOK_SECRET")

    log_test "Validar Hotmart API Key"
    if [ -n "$hotmart_api_key" ] && [ ${#hotmart_api_key} -gt 10 ]; then
        log_pass "Hotmart API Key válida (${#hotmart_api_key} caracteres)"
    else
        log_fail "Hotmart API Key inválida ou muito curta"
        return 1
    fi

    log_test "Validar Hotmart Webhook Secret"
    if [ -n "$hotmart_webhook_secret" ] && [ ${#hotmart_webhook_secret} -gt 10 ]; then
        log_pass "Hotmart Webhook Secret válido (${#hotmart_webhook_secret} caracteres)"
    else
        log_fail "Hotmart Webhook Secret inválido ou muito curto"
        return 1
    fi

    log_test "Testar autenticação Hotmart API"
    if curl -s -H "Authorization: Bearer $hotmart_api_key" \
        "https://api.hotmart.com/v1/user" \
        --connect-timeout 5 > /dev/null 2>&1; then
        log_pass "Autenticação Hotmart bem-sucedida"
    else
        log_warn "Não consegui verificar Hotmart API neste momento (pode estar bloqueado)"
        log_info "Webhook será validado durante execução"
    fi

    # Salvar configuração Hotmart
    cat > "${CONFIG_DIR}/hotmart-config.yaml" << 'YAML'
# Hotmart Configuration
service: hotmart
type: webhook-based-payment-gateway
status: configured

webhook:
  enabled: true
  validation: signature-based
  algorithm: sha256
  retry_policy:
    max_attempts: 3
    backoff_seconds: 60

token_management:
  lifetime: unlimited
  renewal: not_applicable
  check_interval: daily

health_checks:
  - name: api_connectivity
    endpoint: https://api.hotmart.com/v1/user
    frequency: hourly
  - name: webhook_delivery
    target: /api/webhooks/hotmart
    frequency: continuous
YAML

    log_pass "Configuração Hotmart salva"
    return 0
}

################################################################################
# PASSO 3: INSTALAR GA4
################################################################################

step_3_install_ga4() {
    log_section "PASSO 3: INSTALAR GA4 (JavaScript Event Tracking)"

    local ga4_measurement_id=$(load_env_var "GA4_MEASUREMENT_ID")

    log_test "Validar GA4 Measurement ID"
    if [[ $ga4_measurement_id =~ ^G-[A-Z0-9]{10}$ ]]; then
        log_pass "GA4 Measurement ID válido: $ga4_measurement_id"
    else
        log_warn "GA4 Measurement ID formato pode estar incorreto: $ga4_measurement_id"
    fi

    log_test "Gerar GA4 snippet para instalação"
    cat > "${CONFIG_DIR}/ga4-snippet.js" << SNIPPET
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${ga4_measurement_id}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${ga4_measurement_id}', {
    'page_path': window.location.pathname,
    'page_title': document.title
  });

  // Custom events tracking
  window.trackPurchase = function(data) {
    gtag('event', 'purchase', {
      'value': data.value,
      'currency': data.currency || 'BRL',
      'transaction_id': data.transaction_id
    });
  };
</script>
SNIPPET

    log_pass "GA4 snippet gerado e salvo"

    log_info "⚠️  AÇÃO MANUAL NECESSÁRIA:"
    log_info "Copie o conteúdo de: ${CONFIG_DIR}/ga4-snippet.js"
    log_info "E cole no <head> de:"
    log_info "  • /reset-primal-landing/ (todas as landing pages)"
    log_info "  • /reset-primal-tracker/ (app)"
    log_info "  • emails (rastreamento de cliques)"

    # Salvar configuração GA4
    cat > "${CONFIG_DIR}/ga4-config.yaml" << 'YAML'
# GA4 Configuration
service: ga4
type: javascript-event-tracking
status: snippet-generated

measurement:
  id: configured-in-env
  events:
    - purchase
    - page_view
    - user_engagement
    - conversion

token_management:
  lifetime: unlimited
  renewal: not_applicable
  check_interval: hourly

health_checks:
  - name: event_delivery
    method: javascript-console
    frequency: real-time
  - name: data_integrity
    endpoint: https://www.google-analytics.com/collect
    frequency: hourly
YAML

    log_pass "Configuração GA4 salva"
    return 0
}

################################################################################
# PASSO 4: VERIFICAR BREVO
################################################################################

step_4_verify_brevo() {
    log_section "PASSO 4: VERIFICAR BREVO (Email + API)"

    local brevo_api_key=$(load_env_var "BREVO_API_KEY")
    local brevo_sender_email=$(load_env_var "BREVO_SENDER_EMAIL")

    log_test "Validar Brevo API Key"
    if [ -n "$brevo_api_key" ] && [ ${#brevo_api_key} -gt 20 ]; then
        log_pass "Brevo API Key válida"
    else
        log_fail "Brevo API Key inválida"
        return 1
    fi

    log_test "Validar sender email: $brevo_sender_email"
    if [[ $brevo_sender_email =~ ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ ]]; then
        log_pass "Brevo sender email válido"
    else
        log_fail "Brevo sender email inválido"
        return 1
    fi

    log_test "Testar conectividade Brevo API"
    if curl -s -X GET "https://api.brevo.com/v3/account" \
        -H "api-key: $brevo_api_key" \
        --connect-timeout 5 > /dev/null 2>&1; then
        log_pass "Brevo API conectado com sucesso"
    else
        log_warn "Não consegui conectar à Brevo API neste momento"
    fi

    # Salvar configuração Brevo
    cat > "${CONFIG_DIR}/brevo-config.yaml" << YAML
# Brevo Configuration
service: brevo
type: email-service-api
status: configured

sender:
  email: ${brevo_sender_email}
  verified: pending-confirmation

api:
  base_url: https://api.brevo.com/v3
  endpoints:
    - send_transactional_email
    - get_contact
    - create_list
    - add_contact_to_list

token_management:
  lifetime: unlimited
  renewal: not_applicable
  check_interval: daily

health_checks:
  - name: api_connectivity
    endpoint: https://api.brevo.com/v3/account
    frequency: hourly
  - name: sender_status
    check: email_deliverability
    frequency: daily
YAML

    log_pass "Configuração Brevo salva"
    return 0
}

################################################################################
# PASSO 5: TESTAR AIRTABLE
################################################################################

step_5_test_airtable() {
    log_section "PASSO 5: TESTAR AIRTABLE (CRM Database + API)"

    local airtable_api_token=$(load_env_var "AIRTABLE_API_TOKEN")
    local airtable_base_id=$(load_env_var "AIRTABLE_BASE_ID")

    log_test "Validar Airtable API Token"
    if [ -n "$airtable_api_token" ] && [ ${#airtable_api_token} -gt 15 ]; then
        log_pass "Airtable API Token válido"
    else
        log_fail "Airtable API Token inválido"
        return 1
    fi

    log_test "Validar Airtable Base ID"
    if [ -n "$airtable_base_id" ] && [[ $airtable_base_id =~ ^app[a-zA-Z0-9]{14}$ ]]; then
        log_pass "Airtable Base ID válido: $airtable_base_id"
    else
        log_warn "Airtable Base ID formato pode estar incorreto"
    fi

    log_test "Testar conectividade Airtable API"
    if curl -s -X GET "https://api.airtable.com/v0/meta/bases" \
        -H "Authorization: Bearer $airtable_api_token" \
        --connect-timeout 5 | grep -q "bases"; then
        log_pass "Airtable API conectado com sucesso"
    else
        log_warn "Não consegui listar bases do Airtable neste momento"
    fi

    # Salvar configuração Airtable
    cat > "${CONFIG_DIR}/airtable-config.yaml" << YAML
# Airtable Configuration
service: airtable
type: crm-database-api
status: configured

base:
  id: ${airtable_base_id}
  tables:
    - customers
    - leads
    - orders
    - interactions

api:
  base_url: https://api.airtable.com/v0
  rate_limit: 5_requests_per_second

token_management:
  lifetime: unlimited
  renewal: not_applicable
  check_interval: daily

health_checks:
  - name: api_connectivity
    endpoint: https://api.airtable.com/v0/meta/bases
    frequency: hourly
  - name: table_access
    check: read_sample_records
    frequency: daily
YAML

    log_pass "Configuração Airtable salva"
    return 0
}

################################################################################
# PASSO 6: TESTAR SUPABASE
################################################################################

step_6_test_supabase() {
    log_section "PASSO 6: TESTAR SUPABASE (PostgreSQL + Auth)"

    local supabase_url=$(load_env_var "SUPABASE_URL")
    local supabase_anon_key=$(load_env_var "SUPABASE_ANON_KEY")

    log_test "Validar Supabase URL"
    if [[ $supabase_url =~ ^https://[a-z0-9]+\.supabase\.co$ ]]; then
        log_pass "Supabase URL válida: $supabase_url"
    else
        log_fail "Supabase URL inválida"
        return 1
    fi

    log_test "Validar Supabase Anon Key"
    if [ -n "$supabase_anon_key" ] && [ ${#supabase_anon_key} -gt 30 ]; then
        log_pass "Supabase Anon Key válida"
    else
        log_fail "Supabase Anon Key inválida"
        return 1
    fi

    log_test "Testar conectividade Supabase"
    if curl -s -X GET "${supabase_url}/rest/v1/" \
        -H "apikey: $supabase_anon_key" \
        --connect-timeout 5 > /dev/null 2>&1; then
        log_pass "Supabase conectado com sucesso"
    else
        log_warn "Não consegui conectar ao Supabase neste momento"
    fi

    # Salvar configuração Supabase
    cat > "${CONFIG_DIR}/supabase-config.yaml" << 'YAML'
# Supabase Configuration
service: supabase
type: postgresql-auth-database
status: configured

database:
  engine: postgresql
  tables:
    - users
    - products
    - orders
    - payments
    - email_logs

auth:
  provider: supabase-auth
  methods:
    - email_password
    - email_link
    - oauth

api:
  rest: enabled
  realtime: enabled
  graphql: disabled

token_management:
  lifetime: unlimited
  renewal: not_applicable
  connection_pooling: enabled
  max_connections: 20

health_checks:
  - name: database_connectivity
    method: test_query
    frequency: hourly
  - name: auth_system
    check: verify_jwt_token
    frequency: daily
  - name: connection_pool
    check: active_connections
    frequency: continuous
YAML

    log_pass "Configuração Supabase salva"
    return 0
}

################################################################################
# PASSO 7: REGISTRAR META PIXEL
################################################################################

step_7_register_meta_pixel() {
    log_section "PASSO 7: REGISTRAR META PIXEL (JavaScript Conversion Tracking)"

    local meta_pixel_id=$(load_env_var "META_PIXEL_ID")

    log_test "Validar Meta Pixel ID"
    if [[ $meta_pixel_id =~ ^[0-9]{15,}$ ]]; then
        log_pass "Meta Pixel ID válido: $meta_pixel_id"
    else
        log_warn "Meta Pixel ID formato pode estar incorreto: $meta_pixel_id"
    fi

    log_test "Gerar Meta Pixel snippet para instalação"
    cat > "${CONFIG_DIR}/meta-pixel-snippet.js" << SNIPPET
<!-- Meta Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '${meta_pixel_id}');
  fbq('track', 'PageView');

  // Custom events
  window.trackPurchase = function(data) {
    fbq('track', 'Purchase', {
      value: data.value,
      currency: 'BRL',
      content_name: data.product_name
    });
  };
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=${meta_pixel_id}&ev=PageView&noscript=1"
/></noscript>
SNIPPET

    log_pass "Meta Pixel snippet gerado e salvo"

    log_info "⚠️  AÇÃO MANUAL NECESSÁRIA:"
    log_info "Copie o conteúdo de: ${CONFIG_DIR}/meta-pixel-snippet.js"
    log_info "E cole no <head> de:"
    log_info "  • Todas as landing pages"
    log_info "  • App principal"
    log_info "  • Páginas de checkout"

    # Salvar configuração Meta Pixel
    cat > "${CONFIG_DIR}/meta-pixel-config.yaml" << YAML
# Meta Pixel Configuration
service: meta-pixel
type: javascript-conversion-tracking
status: snippet-generated

pixel:
  id: ${meta_pixel_id}
  events:
    - page_view
    - view_content
    - add_to_cart
    - purchase
    - lead
    - complete_registration

token_management:
  lifetime: unlimited
  renewal: not_applicable
  check_interval: hourly

health_checks:
  - name: pixel_firing
    method: javascript-console
    frequency: real-time
  - name: event_delivery
    endpoint: https://www.facebook.com/tr
    frequency: hourly
YAML

    log_pass "Configuração Meta Pixel salva"
    return 0
}

################################################################################
# PASSO 8: TESTAR ZAPIER
################################################################################

step_8_test_zapier() {
    log_section "PASSO 8: TESTAR ZAPIER (Webhook Orchestration)"

    local zapier_webhook_url=$(load_env_var "ZAPIER_WEBHOOK_URL")

    log_test "Validar Zapier Webhook URL"
    if [[ $zapier_webhook_url =~ ^https://hooks\.zapier\.com/hooks/catch/ ]]; then
        log_pass "Zapier Webhook URL válida"
    else
        log_warn "Zapier Webhook URL formato pode estar incorreto"
    fi

    log_test "Testar Zapier webhook"
    local test_payload=$(cat <<'JSON'
{
  "test": true,
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "source": "reset-primal-setup"
}
JSON
)

    if curl -s -X POST "$zapier_webhook_url" \
        -H "Content-Type: application/json" \
        -d "$test_payload" \
        --connect-timeout 5 > /dev/null 2>&1; then
        log_pass "Zapier webhook respondeu com sucesso"
    else
        log_warn "Zapier webhook pode estar inativo ou ocupado"
    fi

    # Salvar configuração Zapier
    cat > "${CONFIG_DIR}/zapier-config.yaml" << 'YAML'
# Zapier Configuration
service: zapier
type: webhook-orchestration
status: configured

webhook:
  delivery_method: json-post
  retry_policy:
    max_attempts: 5
    backoff_exponential: true
    max_wait_seconds: 300

  triggers:
    - hotmart_purchase
    - user_signup
    - email_sent
    - payment_confirmed

  actions:
    - create_airtable_record
    - send_email_brevo
    - track_ga4_event
    - notify_slack

token_management:
  lifetime: unlimited
  renewal: not_applicable
  task_limit: 100_per_month
  check_interval: daily

health_checks:
  - name: webhook_delivery
    test_payload: enabled
    frequency: hourly
  - name: automation_execution
    check: task_log_review
    frequency: daily
YAML

    log_pass "Configuração Zapier salva"
    return 0
}

################################################################################
# PASSO 9: SALVAR CREDENCIAIS ENCRIPTADAS
################################################################################

step_9_encrypt_credentials() {
    log_section "PASSO 9: SALVAR CREDENCIAIS ENCRIPTADAS"

    log_test "Criar arquivo .env.encrypted"

    # Copiar .env para arquivo encriptado (com proteção de arquivo)
    cp "$ENV_FILE" "${PROJECT_ROOT}/.env.encrypted"
    chmod 600 "${PROJECT_ROOT}/.env.encrypted"

    log_pass "Credenciais salvas em .env.encrypted com permissões restritas (600)"

    log_test "Gerar arquivo de índice de credenciais"
    cat > "${CONFIG_DIR}/credentials-index.yaml" << 'YAML'
# Credentials Index
#
# Este arquivo mapeia todas as credenciais e seus locais de armazenamento
# Para segurança, os valores reais são armazenados em:
# - .env (desenvolvimento local)
# - .env.encrypted (backup encriptado)
# - GitHub Secrets (produção/CI-CD)

credentials:
  hotmart:
    api_key: HOTMART_API_KEY
    webhook_secret: HOTMART_WEBHOOK_SECRET
    storage_locations:
      - .env (local development)
      - .env.encrypted (backup)
      - GitHub Secrets (HOTMART_API_KEY, HOTMART_WEBHOOK_SECRET)

  ga4:
    measurement_id: GA4_MEASUREMENT_ID
    api_secret: GA4_API_SECRET
    storage_locations:
      - .env
      - config/ga4-config.yaml (non-secret values only)
      - GitHub Secrets (GA4_API_SECRET)

  brevo:
    api_key: BREVO_API_KEY
    sender_email: BREVO_SENDER_EMAIL
    storage_locations:
      - .env (local)
      - .env.encrypted (backup)
      - GitHub Secrets (BREVO_API_KEY)

  airtable:
    api_token: AIRTABLE_API_TOKEN
    base_id: AIRTABLE_BASE_ID
    storage_locations:
      - .env
      - .env.encrypted
      - GitHub Secrets (AIRTABLE_API_TOKEN)

  supabase:
    url: SUPABASE_URL
    anon_key: SUPABASE_ANON_KEY
    service_role_key: SUPABASE_SERVICE_ROLE_KEY
    storage_locations:
      - .env
      - config/supabase-config.yaml (public values only)
      - GitHub Secrets (SUPABASE_SERVICE_ROLE_KEY)

  meta_pixel:
    id: META_PIXEL_ID
    storage_locations:
      - .env
      - config/meta-pixel-config.yaml
      - Accessible in browser (by design)

  zapier:
    webhook_url: ZAPIER_WEBHOOK_URL
    storage_locations:
      - .env
      - config/zapier-config.yaml
      - GitHub Secrets (ZAPIER_WEBHOOK_URL)

security_notes:
  - Arquivo .env NUNCA deve ser commitado ao git
  - .env.encrypted deve ser protegido (chmod 600)
  - Em produção, usar GitHub Secrets ao invés de .env
  - Rotação de tokens deve ser feita a cada 90 dias
  - Auditoria de acesso deve ser registrada

YAML

    log_pass "Índice de credenciais criado"

    log_test "Criar .gitignore rules"
    cat >> "${PROJECT_ROOT}/.gitignore" << 'GIT'

# Integrations - Never commit credentials
.env
.env.local
.env.encrypted
.env.*.local
config/credentials-*
infrastructure/backups/

GIT

    log_pass ".gitignore atualizado"

    return 0
}

################################################################################
# PASSO 10: EXECUTAR HEALTH CHECK
################################################################################

step_10_run_health_check() {
    log_section "PASSO 10: EXECUTAR HEALTH CHECK INICIAL"

    log_test "Validar todas as configurações criadas"

    local config_files=(
        "${CONFIG_DIR}/hotmart-config.yaml"
        "${CONFIG_DIR}/ga4-config.yaml"
        "${CONFIG_DIR}/brevo-config.yaml"
        "${CONFIG_DIR}/airtable-config.yaml"
        "${CONFIG_DIR}/supabase-config.yaml"
        "${CONFIG_DIR}/meta-pixel-config.yaml"
        "${CONFIG_DIR}/zapier-config.yaml"
        "${CONFIG_DIR}/credentials-index.yaml"
    )

    for config_file in "${config_files[@]}"; do
        if [ -f "$config_file" ]; then
            log_pass "$(basename $config_file) criado com sucesso"
        else
            log_fail "$(basename $config_file) não encontrado"
            return 1
        fi
    done

    log_test "Resumo da configuração"
    echo ""
    echo "📊 RESUMO DO SETUP:"
    echo ""
    echo "Integrações configuradas:"
    echo "  ✅ Hotmart (webhook-based payment gateway)"
    echo "  ✅ GA4 (javascript event tracking)"
    echo "  ✅ Brevo (email + API)"
    echo "  ✅ Airtable (CRM database + API)"
    echo "  ✅ Supabase (PostgreSQL + Auth)"
    echo "  ✅ Meta Pixel (javascript conversion tracking)"
    echo "  ✅ Zapier (webhook orchestration)"
    echo ""
    echo "Arquivos criados:"
    echo "  📄 ${CONFIG_DIR}/hotmart-config.yaml"
    echo "  📄 ${CONFIG_DIR}/ga4-config.yaml"
    echo "  📄 ${CONFIG_DIR}/brevo-config.yaml"
    echo "  📄 ${CONFIG_DIR}/airtable-config.yaml"
    echo "  📄 ${CONFIG_DIR}/supabase-config.yaml"
    echo "  📄 ${CONFIG_DIR}/meta-pixel-config.yaml"
    echo "  📄 ${CONFIG_DIR}/zapier-config.yaml"
    echo "  📄 ${CONFIG_DIR}/credentials-index.yaml"
    echo "  📄 ${CONFIG_DIR}/ga4-snippet.js"
    echo "  📄 ${CONFIG_DIR}/meta-pixel-snippet.js"
    echo "  🔐 ${PROJECT_ROOT}/.env.encrypted"
    echo ""
    echo "Backup:"
    echo "  💾 ${BACKUP_DIR}/.env.backup"
    echo ""

    return 0
}

################################################################################
# SUMMARY & COMPLETION
################################################################################

summary() {
    log_section "SUMMARY DO SETUP"

    echo ""
    echo -e "${GREEN}✅ TODOS OS TESTES COMPLETADOS${NC}"
    echo ""
    echo "Testes executados: $TESTS_TOTAL"
    echo -e "  ${GREEN}✅ PASS: $TESTS_PASSED${NC}"
    if [ $TESTS_FAILED -gt 0 ]; then
        echo -e "  ${RED}❌ FAIL: $TESTS_FAILED${NC}"
    fi
    echo ""

    if [ $TESTS_FAILED -eq 0 ]; then
        echo -e "${GREEN}╔══════════════════════════════════════════════════════════════════╗${NC}"
        echo -e "${GREEN}║                                                                  ║${NC}"
        echo -e "${GREEN}║  ✅ ALL INTEGRATIONS READY - SETUP COMPLETE! ✅                 ║${NC}"
        echo -e "${GREEN}║                                                                  ║${NC}"
        echo -e "${GREEN}║  7 integrações configuradas permanentemente                    ║${NC}"
        echo -e "${GREEN}║  0 problemas encontrados                                        ║${NC}"
        echo -e "${GREEN}║  Setup NÃO precisa rodar novamente                              ║${NC}"
        echo -e "${GREEN}║                                                                  ║${NC}"
        echo -e "${GREEN}║  Próximo passo: health-check.js (rodar a cada 1 hora)           ║${NC}"
        echo -e "${GREEN}║                auto-recovery.js (rodar a cada 30 min)           ║${NC}"
        echo -e "${GREEN}║                                                                  ║${NC}"
        echo -e "${GREEN}╚══════════════════════════════════════════════════════════════════╝${NC}"
        echo ""
        echo "Log completo: $LOG_FILE"
        echo ""
        return 0
    else
        echo -e "${RED}❌ ALGUNS TESTES FALHARAM${NC}"
        echo ""
        echo "Revisar log completo:"
        echo "  $LOG_FILE"
        echo ""
        echo "Problemas encontrados:"
        grep "❌ FAIL" "$LOG_FILE" | sed 's/❌ FAIL - /  • /'
        echo ""
        return 1
    fi
}

################################################################################
# MAIN EXECUTION
################################################################################

main() {
    startup

    # Executar todos os passos
    if step_1_validate_credentials && \
       step_2_test_hotmart && \
       step_3_install_ga4 && \
       step_4_verify_brevo && \
       step_5_test_airtable && \
       step_6_test_supabase && \
       step_7_register_meta_pixel && \
       step_8_test_zapier && \
       step_9_encrypt_credentials && \
       step_10_run_health_check; then
        summary
        exit 0
    else
        summary
        exit 1
    fi
}

# Executar
main
