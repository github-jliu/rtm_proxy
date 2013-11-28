<?php
include 'init.php';

$toDoUrlLeanne = 'http://www.rememberthemilk.com/atom/liu111/13849732/?tok=eJwNy7kNQzEMBNGKBGgpHlI5PETAgDPb-ftH85I5kYLU5nayWJv2DkzlE6GHOchRlA6paR2BPDBj7q4oK7vj-foBePL5DqzNxxYNn14UJaLEpqKzt1fgTMRd6SXsV-lRNmmqk7iGPRPu4gb*YwsqIA';
$dom = new DOMDocument();
$dom->loadXML(file_get_contents($toDoUrlLeanne));
$html = $xsltproc->transformToXML($dom);
print $html;
?>
