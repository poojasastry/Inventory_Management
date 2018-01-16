<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<!--	menu.jsp
		Required: menu.css,menu.js,logout.js
		Pooja Sastry, CS645, Spring 2017
-->

<head>
	<title>Diva's Warehouse Inventory Manager</title>
	<meta http-equiv="content-type" content="text/html;charset=utf-8" />
	<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />  
    <script type="text/javascript" src="/jquery/jquery.js"></script>
    <script src="/jquery/jQueryUI.js"></script>    
    <script src="/jadrn044/logout.js"></script>
    <script type="text/javascript" src="/jadrn044/menu.js"></script>   
    <link rel="stylesheet" type="text/css" href="/jadrn044/menu.css" />    
</head>

<body>	
    <div id='main'> 

		<!--<h3>Your session id is <%= session.getId() %>-->
		<div id="tabs">
		<h3>Welcome <%= session.getAttribute("username") %>!</h3>
      	<ul>
        	<li><a href="#tabs-1"><span>Inventory Received</span></a></li>
        	<li><a href="#tabs-2"><span>Inventory Sent Out</span></a></li> 
        	<li><input type='button' value='Logout' id='logout' /></li>
      	</ul> 
		<div id="tabs-1">	
			<h4><u>Merchandise received into the warehouse: </u></h4>
		 	<form method="post" id='insert' action="">
				<label> *SKU </label>
					<input type='text' id='sku' name='sku' />
				<b>*Date</b>
					<input type='text' id='date' name='date' /><br>
				<label> Category </label>
					<input type='text' id='category' name='category' readonly/>
				<b>Vendor</b>
					<input type='text' id='vendor' name='vendor' readonly/><br>
				<label> Manufacturer's ID </label>
					<input type='text' id='mfid' name='mfid' readonly/>
				<b>Available Stock</b>
					<input type='text' id='stock' name='stock' readonly/><br>
				<label> Product Image </label>
				<div id='pdtimage'></div><br>
				<label> *Add Quantity </label>
					<input type='text' id='qty' name='quantity' /><br>
				<input type='button' id='resetval' value='Reset'/>
			 	<input type='button' value='Add to Inventory Received' id='sub' disabled='disabled' />
			 	
			</form>
			<div id='showdata'></div>
			<input type='button' value='Add another Inventory Received' id='add' />
		</div>
		<div id="tabs-2">
		   	<h4><u> Merchandise sent from the warehouse: </u></h4>
			<form method="post" id='remove' action="">
				<label> *SKU </label>
					<input type='text' id='sku2' name='sku2' />
				<b>*Date</b>
					<input type='text' pattern="\d{1,2}/\d{1,2}/\d{4}" id='date2' name='date2' /><br>
				<label><b> Category </b></label>
					<input type='text' id='category2' name='category2' readonly/>
				<b>Vendor</b>
					<input type='text' id='vendor2' name='vendor2' readonly/><br>
				<label> Manufacturer's ID </label>
					<input type='text' id='mfid2' name='mfid2' readonly/>
				<b>Available Stock</b>
					<input type='text' id='stock2' name='stock2' readonly/><br>
				<label> Product Image </label>
				<div id='pdtimage2'></div><br>
				<label> *Send Quantity </label>
					<input type='text' id='qty2' name='quantity2' /><br>
				<input type='button' id='resetval2' value='Reset'/>
			 	<input type='button' value='Add to Inventory Sent' id='sub2' disabled='disabled' />
			</form>
			<div id='showdata2'></div>
			<input type='button' value='Add another Inventory Sent' id='send' />
		</div>
		</div>        
    </div>
</body>
</html>

