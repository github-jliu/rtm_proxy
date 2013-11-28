<?php
include 'init.php';

$toDoUrlJustin = 'http://www.rememberthemilk.com/atom/liu111/18482800/?tok=eJwNzDsOQzEIBdEVWQKM*SzHF2wpUrok*8*rpjqTqMVlV*8WxwyJAJNpApaqkM0ttXk1*QW4kt1V7220t5-xfv2Y*cnnOzj0GRCN2SFVBjgnGEv2zJjsD2u4sNjxdRIVEd7U22mbuGWZXiL8AVd*KY0';
$dom = new DOMDocument();
$dom->loadXML(file_get_contents($toDoUrlJustin));
$html = $xsltproc->transformToXML($dom);
print $html;
?>
