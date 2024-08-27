<?php
//http://localhost/server/proy18/api/?ruta=oso
header("Content-type: application/json");
$bbd=new mysqli("localhost","root","redes2024","pluscar");
/*if(isset($_GET["ruta"])){$ruta=$_GET["ruta"];}else{$ruta="";}*/

$tam=strlen(dirname($_SERVER["SCRIPT_NAME"]));
if($tam==1){$inc=0;}else{$inc=1;}
$ruta=explode("/",substr($_SERVER["REQUEST_URI"],$tam+$inc));

$data=array("resp"=>false,"msg"=>"HOLA MUNDO","RUTA"=>$ruta);

switch($ruta[0])
{
    case "userlist":
        if(isset($ruta[1])){$busq=$ruta[1];}else{$busq='';}
        $list=array();
        $m=$bbd->query("select num,nom,ap,ci from user where std='act' and (nom like '%$busq%' or ap like '%$busq%') ");
        foreach($m as $v){
            array_push($list,array("num"=>$v["num"],"nom"=>$v["nom"],"ap"=>$v["ap"],"ci"=>$v["ci"]));
        }
        $data=array("resp"=>true,"list"=>$list);
    break;
    case"usersave":
        $nom=$_POST['nom'];   
        $ap=$_POST['ap'];
        $ci=$_POST['ci'];
        $pwd=sha1($_POST["pwd"]);
        if($bbd->query("insert into user (nom,ap,ci,pwd,std) values ('$nom','$ap','$ci','$pwd','act')"))
        {$resp=true;}
        else
        {$resp=false;}
        $data=array("resp"=>$resp,"msg"=>"REGISTRO USUARIO");
    break;
    case"login":
        $ci=$_POST['ci'];
        $pwd=sha1($_POST['pwd']);
        $data=array("resp"=>false,"msg"=>"CONTRASEÑA INCORRECTA");
        $m=$bbd->query("select num,nom,ap from user where ci='$ci' and pwd='$pwd'");
        foreach($m as $v){
            $data=array("resp"=>true,"num"=>$v["num"],"nom"=>$v["nom"],"ap"=>$v["ap"]);
        }
    break;
    case"autosave":
        $num=$_POST['num'];   
        $placa=$_POST['placa'];
        $chas=$_POST['chas'];
        $mode=$_POST['mode'];
        $des=$_POST['des'];
        if($bbd->query("insert into auto (placa,chas,mode,des,stda,num)values('$placa','$chas','$mode','$des','act',$num)"))
        {$resp=true;}
        else
        {$resp=false;}
        $data=array("resp"=>$resp,"msg"=>"REGISTRO AUTO");
    break;
    case "autolist":
        $list=array();
        $m=$bbd->query("select numA,placa,chas from auto,user where auto.num=user.num and std='act' ");
        foreach($m as $v){
            array_push($list,array("numA"=>$v['numA'],"placa"=>$v['placa'],"chas"=>$v['chas'],"nom"=>$v['nom'],"ap"=>$v['ap']));
        }
        $data=array("resp"=>true,"list"=>$list);
    break;
}
echo json_encode($data);
?>