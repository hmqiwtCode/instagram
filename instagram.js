getLink = () => {
	if (document.getElementById("url").value.trim() == '') {
		document.getElementById('content').innerHTML = '<p class="alert alert-danger">URL not null</p>';
		return false;
	}
	let link = document.getElementById("url").value;
	let id = link.split('/', 5)[4];
	let cate = document.getElementById("option").value;
	let linkDown = 'https://www.instagram.com/p/'+id+'/media?size=' + cate;
	document.getElementById('content').innerHTML  = '<img src='+linkDown+' alt="img">';
	if(document.getElementById('auto').checked == true){
		document.getElementById('error').innerHTML = '<p class="font-weight-bold">Wait a second <i class="fa fa-spinner fa-1 fa-spin" aria-hidden="true"></i></p>';
		document.getElementById('error').style.display  = 'block';
		setTimeout(function(){
    		document.getElementById('error').style.display = ' none';
		}, 2000);
		Algorithmia.client("simqmeHOQQG04FjbLOjTznrW6jU1")
  		.algo("raunaqrox/downloadimage/0.1.0?timeout=300")
  		.pipe(linkDown)
  		.then(function(output) { download("data:application/octet-stream;base64,"+ output.result, "image.jpg", "application/octet-stream;base64");; });
	}
}

document.getElementById("download").onclick = getLink;
