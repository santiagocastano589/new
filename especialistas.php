<?php
header('Content-Type: application/json');

$server = "172.30.0.2";
$username = "HOSVITAL";
$password = "CCQ2019Clinica";
$database = "HOSVITAL";

try {
    $conn = new PDO("sqlsrv:server=$server;Database=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    

    $query2 = "SELECT     

    LTRIM(RTRIM(mae1.MMCODM)) AS COD_MEDICO,
    LTRIM(RTRIM(mae1.MMNomM)) AS MEDICO, 
    LTRIM(RTRIM(esp.MECodE)) AS COD_ESPECIALIDAD, 
    LTRIM(RTRIM(MENomE)) AS ESPECIALIDAD FROM          
                                         dbo.MAEMED1  mae1 LEFT JOIN
                                         dbo.MAEMED ma WITH (NOLOCK) ON  mae1.MMCODM=ma.MMCODM left join
                                         dbo.ADMUSR WITH (NOLOCK) ON  AUsrId=MMUsuario left join
                                         dbo.MAEESP esp WITH (NOLOCK) ON ma.MECodE = esp.MECodE  where MMEstado='A' AND MMTpoServ='1' and AUsrEst='S' AND esp.MECodE IN ('137','133','134','143','138','148','340','341','521','440','750')
                                         and mae1.MMCODM not in ('SIS02','SIS04','ME243');";
    $ejq = $conn->prepare($query2);
    $ejq->execute();
    $results = $ejq->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode($results);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
