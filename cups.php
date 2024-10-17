<?php
header('Content-Type: application/json');

$server = "172.30.0.2";
$username = "HOSVITAL";
$password = "CCQ2019Clinica";
$database = "HOSVITAL";

try {
    $conn = new PDO("sqlsrv:server=$server;Database=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query3 = "SELECT PRCODI as Codigo,ltrim(rtrim(PrNomb)) Procedimiento FROM  MAEPRO;";
    $ej = $conn->prepare($query3);
    $ej->execute();
    $results = $ej->fetchAll(PDO::FETCH_ASSOC);
    

    if (isset($_GET['cups'])) {
        $cups = $_GET['cups'];
    
        $query = "SELECT ltrim(rtrim(PrNomb)) as Procedimiento FROM MAEPRO WHERE PRCODI = :cups";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':cups', $cups);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
    
        echo json_encode($result);
        exit;
    }
    
    
    echo json_encode($results);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>



