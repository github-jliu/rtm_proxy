<?php
$xsl = new DOMDocument();
$xsl->load('todo.xsl');
$xsltproc = new XSLTProcessor();
$xsltproc->registerPHPFunctions();
$xsltproc->importStylesheet($xsl);
?>
