<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-KKTGW6BEJP"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-KKTGW6BEJP', {
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
