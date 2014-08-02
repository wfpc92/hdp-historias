<html>
<head>
	<script src="jquery-2.1.1.min.js"></script>
	<script src="stupidtable.min.js"></script>
	<script>
		$(document).ready(function() {
			console.log("asdfsdf")
			$("#mitabla").stupidtable();
		});
		
	</script>
</head>

<body>
<?php
function kb($b) {
	return round (($b / 1024), 2);
}

function mb($b) {
	return round (($b / 1048576), 2);
}

error_reporting(E_ALL);
ini_set('display_errors', 1);

$urls = array();

//get all image files with a .jpg extension.
$images = glob("../img/*/*.*");
foreach($images as $image) { $urls[] = "$image"; }

$images = glob("../img/*/*/*.*");
foreach($images as $image) { $urls[] = "$image"; }

$images = glob("../img/*/*/*/*.*");
foreach($images as $image) { $urls[] = "$image"; }
?>

Dimensiones en pixeles, Memoria en MB.

<table id ="mitabla" border="1">
<thead>
<tr>
	<th>Archivo</th>
	<th data-sort="int">Ancho<br />Ori</th>
	<th data-sort="int">Alto<br />Ori</th>
	<th data-sort="int">Ancho<br />Tex</th>
	<th data-sort="int">Alto<br />Tex</th>
	<th data-sort="int">Ancho<br />Sobra</th>
	<th data-sort="int">Alto<br />Sobra</th>
	<th data-sort="float">Memor<br />Ideal</th>
	<th data-sort="float">Memor<br />Real</th>
	<th data-sort="float">Memor<br />Desperdicio</th>
	<th data-sort="float">Memor<br />Desp %</th>
</tr>
</thead>
<?php
$totalDesperdicio = 0;
$totalMemReal = 0;
$totalMemIdeal = 0;

foreach ($urls as $url) {
    echo "<tr>";
	echo "<td>$url</td>";
	
	$data = getimagesize($url);
	$width = $data[0];
	$height = $data[1];
	echo "<td>$width</td>";
	echo "<td>$height</td>";
	
	$anchoTex = 2;
	while ($anchoTex < $width) $anchoTex *= 2;
	$altoTex = 2;
	while ($altoTex < $height) $altoTex *= 2;
	
	echo "<td>$anchoTex</td>";
	echo "<td>$altoTex</td>";
	
	$despAncho = $anchoTex - $width;
	$despAlto = $altoTex - $height;
	
	echo "<td>$despAncho</td>";
	echo "<td>$despAlto</td>";
	
	$memOriginal = $width * $height * 4;
	$memReal = $anchoTex * $altoTex * 4;
	$memDesperdicio = $memReal - $memOriginal;
	$porcent = round(($memDesperdicio / $memReal), 1);
	
	$totalDesperdicio += $memOriginal;
	$totalMemReal += $memReal;
	$totalMemIdeal += $memDesperdicio;
	
	
	echo "<td>" . mb($memOriginal) . "</td>";
	echo "<td>" . mb($memReal) . "</td>";
	echo "<td>" . mb($memDesperdicio) . "</td>";
	echo "<td>" . $porcent . "</td>";
	
    echo "</tr>";
}
?>
</table>
<table>
<?php echo "<tr><td>TOTAL</td><td>" . mb($totalMemIdeal) . "</td><td>" . mb($totalMemReal) . "</td><td>" . mb($totalDesperdicio) . "</td></tr>"; ?>
</table>
</body>