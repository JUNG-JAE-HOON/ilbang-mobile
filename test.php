<?php
header('Access-Control-Allow-origin: *');
include_once "./connect/db_connect.php";


if($_POST["id"]!=""){

    $id = $_POST["id"];
		if($_POST["type"]=='check'){

        	$sql="select * from work_item where uid='$id' and item_id = '1'"; //member_id로 db검색
        	$result= mysql_query($sql);
        	$row = mysql_fetch_array($result);
          echo json_encode(array('result' => $row['count']));

          return ;

    } else if ($_POST["type"]== "itemConsume"){
          			 $sql="select * from work_item where uid='$id' and item_id = '1'"; //member_id로 db검색
          			 $result= mysql_query($sql);
            	   $row = mysql_fetch_array($result);

          			 $dbDataNo = $row['no'];
          			 $count = $row['count'];
          			 $count-=1;
          		 	 $date = date("Y-m-d H:i:s",time());
	  	     			 $sql="UPDATE work_item SET count = '$count', wdate = '$date' WHERE no='$dbDataNo'";
           			 $result= mysql_query($sql);
        	       if(mysql_affected_rows() == 1){   //////////1
                          $sql = "INSERT INTO item_use_log(no, user_id, item_name, use_date) VALUES(NULL,'$id','net.saltfactory.il_bang.emergency1buy','$date')";
                          $result = mysql_query($sql);

													if(mysql_affected_rows() == 1){  ////아이템 사용 로그 등록 성공    ///////////444444444
        	                			if($_POST["state"]=="change"){ ///////////////2
        		                					$postNo = $_POST["no"];
        		                					$sql="UPDATE work_employ_data SET emergency_check = '1' WHERE no ='$postNo'";
        		                					$result= mysql_query($sql);

                                			if(mysql_affected_rows() == 1){     //이력서 상태 변경 성공     ///////////3
                                						$sql="SELECT * from work_employ_data where no ='$postNo'"; //member_id로 db검색
                                      			$result= mysql_query($sql);
																						if(mysql_affected_rows() == 1){  //

                                      					while($row = mysql_fetch_array($result)){
        		                          							echo json_encode(array('result' => 'data update success', 'lat'=>$row['lat'], 'lng'=>$row['lng']));
                                          					return ;
                                      					}
																						}
                                 			}else{			
																						//이력서 상태 변경 실패

																						$date = date("Y-m-d H:i:s",time());
																						$sql = "INSERT INTO item_use_log(no, user_id, item_name, use_date, state) VALUES(NULL,'$id','net.saltfactory.il_bang.emergency1buy','$date', 'fail')";
									                          $result = mysql_query($sql);

																						$count+=1;
																						$sql="UPDATE work_item SET count = '$count', wdate = '$date' WHERE no='$dbDataNo'";
																						$result= mysql_query($sql);
                                      			echo json_encode(array('result' => 'data update fail'));
                                      			return ;
                                 			}///////////////3


        	                			}/////////////////////2
													}else{

															///로그 남기기 실패해서 아이템 되돌리기
															$count+=1;
															$date = date("Y-m-d H:i:s",time());
															$sql="UPDATE work_item SET count = '$count', wdate = '$date' WHERE no='$dbDataNo'";
															$result= mysql_query($sql);

															echo json_encode(array('result'=>'data update fail'));
															return ;
													}/////////////////////////44444444444444


                 					echo json_encode(array('result' => 'data update success'));
                 					return ;
		            }else{
                          echo json_encode(array('result' => 'data update fail'));
                          return ;
                }//////////////////1
						}

}else{
			echo json_encode(array('result' => '아이디 없음'));
	    return ;
}


?>
