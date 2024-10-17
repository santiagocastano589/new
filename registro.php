<?php
header('Content-Type: application/json');

$server = "172.30.0.2";
$username = "HOSVITAL";
$password = "CCQ2019Clinica";
$database = "HOSVITAL";

try {
    $conn = new PDO("sqlsrv:server=$server;Database=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);



    $query = "INSERT INTO RADICACIONCX (FecRadi, Radicador, TipDoc, Documento, Paciente, Tel1, tel2, Cups1, Cups2, Cups3, Cups4, Cups5, OtroCups, OtroProcedimiento, Esp, Especialista, Eps, TipoContrato, Regimen, Anestesia, FecAnestesia, Observacion, Comentarios) 
              VALUES (:FecRadi, :Radicador, :TipDoc, :Documento, :Paciente, :Tel1, :tel2, :Cups1, :Cups2, :Cups3, :Cups4, :Cups5, :OtroCups, :OtroProcedimiento, :Esp, :Especialista, :Eps, :TipoContrato, :Regimen, :Anestesia, :FecAnestesia, :Observacion, :Comentarios)";

    $stmt = $conn->prepare($query);
    
    $stmt->bindParam(':FecRadi', $_POST['FecRadi']);
    echo $_POST['FecRadi'];
    $stmt->bindParam(':Radicador', $_POST['Radicador']);
    $stmt->bindParam(':TipDoc', $_POST['TipDoc']);
    $stmt->bindParam(':Documento', $_POST['Documento']);
    $stmt->bindParam(':Paciente', $_POST['Paciente']);
    $stmt->bindParam(':Tel1', $_POST['Tel1']);
    $stmt->bindParam(':tel2', $_POST['tel2']);
    $stmt->bindParam(':Cups1', $_POST['Cups1']);
    $stmt->bindParam(':Cups2', $_POST['Cups2']);
    $stmt->bindParam(':Cups3', $_POST['Cups3']);
    $stmt->bindParam(':Cups4', $_POST['Cups4']);
    $stmt->bindParam(':Cups5', $_POST['Cups5']);
    $stmt->bindParam(':OtroCups', $_POST['OtroCups']);
    $stmt->bindParam(':Esp', $_POST['Esp']);
    $stmt->bindParam(':Especialista', $_POST['Especialista']);
    $stmt->bindParam(':Eps', $_POST['Eps']);
    $stmt->bindParam(':TipoContrato', $_POST['TipoContrato']);
    $stmt->bindParam(':Regimen', $_POST['Regimen']);
    $stmt->bindParam(':Anestesia', $_POST['Anestesia']);
    $stmt->bindParam(':FecAnestesia', $_POST['FecAnestesia']);
    $stmt->bindParam(':Observacion', $_POST['Observacion']);
    $stmt->bindParam(':Comentarios', $_POST['Comentarios']);
    $stmt->bindParam(':OtroProcedimiento', $_POST['OtroProcedimiento']);
    $stmt->execute();
    header('Location:actualizar.html');


} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>


