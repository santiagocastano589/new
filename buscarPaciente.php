<?php
header('Content-Type: application/json');

$server = "172.30.0.2";
$username = "HOSVITAL";
$password = "CCQ2019Clinica";
$database = "HOSVITAL";

try {
    $conn = new PDO("sqlsrv:server=$server;Database=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = "SELECT 
    ltrim(rtrim(FecRadi)) FecRadi, 
    ltrim(rtrim(Radicador)) Radicador, 
    ltrim(rtrim(TipDoc)) TipDoc, 
    ltrim(rtrim(Documento)) Documento,
    ltrim(rtrim(Paciente)) Paciente,
    ltrim(rtrim(Tel1)) Tel1,
    ltrim(rtrim(tel2)) tel2,
    ltrim(rtrim(Cups1)) Cups1,
    ltrim(rtrim(Cups2)) Cups2,
    ltrim(rtrim(Cups3)) Cups3,
    ltrim(rtrim(Cups4)) Cups4,
    ltrim(rtrim(Cups5)) Cups5,
    ltrim(rtrim(OtroCups)) OtroCups,
    ltrim(rtrim(OtroProcedimiento)) OtroProcedimiento,
    ltrim(rtrim(Esp)) Esp,
    ltrim(rtrim(Especialista)) Especialista,
    ltrim(rtrim(Eps)) Eps,
    ltrim(rtrim(TipoContrato)) TipoContrato,
    ltrim(rtrim(Regimen)) Regimen,
    ltrim(rtrim(Anestesia)) Anestesia,
    ltrim(rtrim(FecAnestesia)) FecAnestesia,
    ltrim(rtrim(Observacion)) Observacion,
    ltrim(rtrim(Comentarios)) Comentarios FROM RADICACIONCX";
    
    $stmt = $conn->prepare($query);
    $stmt->execute();

    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    
    echo json_encode($results);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
