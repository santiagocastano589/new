<?php
header('Content-Type: application/json');

$server = "172.30.0.2";
$username = "HOSVITAL";
$password = "CCQ2019Clinica";
$database = "HOSVITAL";

try {
    $conn = new PDO("sqlsrv:server=$server;Database=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $observacion = $_POST['observacion'];
    $fecRadi = $_POST['FecRadi'];
    $documento = $_POST['documento'];

    $query = "UPDATE RADICACIONCX SET Observacion = :observacion WHERE (Documento = :documento) AND (FecRadi = :FecRadi)";
    
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':observacion', $observacion);
    $stmt->bindParam(':FecRadi', $fecRadi);
    $stmt->bindParam(':documento', $documento);
    $stmt->execute();

    header('Content-Type: application/json');
    echo json_encode(['success' => true]);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
