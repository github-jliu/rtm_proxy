<?php
include 'init.php';

$dom = new DOMDocument();
$feedsNode = $dom->createElement('feeds');
$feedsNode->setAttribute('xmlns', 'http://www.w3.org/2005/Atom');
$dom->appendChild($feedsNode);

$toDoUrlJustin = 'http://www.rememberthemilk.com/atom/liu111/11637878/?tok=eJwNyzEOAzEIBMAXncSCDfg5XjhLkdIl*X*ummoWa6L8jLM1aKmZhPhYpK8xqButtTFb4pCohYgxzml2dNzX*-UD8PD5XoBbZOQV7d1izxOybGpEWlMFMlzlBqbFlq65tYHay9rKOI8yl-ofSFgpLQ';
$tempdom = new DOMDocument();
$tempdom->loadXML(file_get_contents($toDoUrlJustin));
$newNode = $dom->importNode($tempdom->documentElement, true);
$newNode->setAttribute('completedtasks', '0');
$feedsNode->appendChild($newNode);


$completedUrlJustin = 'http://www.rememberthemilk.com/atom/liu111/11637878/completed/?tok=eJwNyzEOAzEIBMAXncSCDfg5XjhLkdIl*X*ummoWa6L8jLM1aKmZhPhYpK8xqButtTFb4pCohYgxzml2dNzX*-UD8PD5XoBbZOQV7d1izxOybGpEWlMFMlzlBqbFlq65tYHay9rKOI8yl-ofSFgpLQ';
$tempdom = new DOMDocument();
$tempdom->loadXML(file_get_contents($completedUrlJustin));
$newNode = $dom->importNode($tempdom->documentElement, true);
$newNode->setAttribute('completedtasks', '1');
$feedsNode->appendChild($newNode);


//$dom->formatOutput = true;
//print $dom->saveXML();exit;
$html = $xsltproc->transformToXML($dom);
print $html;

?>
