$(document).ready(function(){
  $("#url").change(function(){
  	const regExp = new RegExp("(https:\/\/(www.|m.|)instagram.com\/p\/).{11}(\/|\/.*)$");
  	if(!regExp.test($("#url").val())){
  		alert("Invalid");
  		$("#url").val("");
  		return false;
  	}
    const arrID = $("#url").val().split('/')[4];
    $("#link").val("https://www.instagram.com/p/"+arrID+"/?__a=1");
  });


  $("#download").click(function(){
  	if($("#source").val().trim() == ''){
  		alert("Invalid");
  		return false;
  	}
  	const source = $("#source").val();
  	const myJson = $.parseJSON(source);
  	const root = myJson.graphql.shortcode_media;
  	//console.log(root.is_video);
  	if(root.__typename === 'GraphSidecar'){
  		let imgSource = "<div class='container'><div class='row'>";
  		for(let i = 0; i< root.edge_sidecar_to_children.edges.length;i++){
  			console.log(root.edge_sidecar_to_children.edges[i].node.display_url);

  			imgSource += "<div class='box_img box-shadow'><div class='button1 text-shadow'><a target='_blank'  href="+$("#url").val()+"><i class='fa fa-external-link-square'></i></a></div><img src="+root.edge_sidecar_to_children.edges[i].node.display_url+">";
  			imgSource += "<a class='btn btn-success mt-2 text-shadow box-shadow' target='_blank' href="+root.edge_sidecar_to_children.edges[i].node.display_url +'&dl=1'+"><i class='fa fa-download'></i> Download</a></div>";

  		}
  		$("#content").html(imgSource+"</div></div>");

  	}
  	else if(myJson.show_suggested_profiles === false){
  		let total = 0;
  		for(let i = 0; i < myJson.graphql.edge_owner_to_timeline_media.edges.length; i++){
  			if(myJson.graphql.edge_owner_to_timeline_media.edges.node.is_video === true){
  				console.log(myJson.graphql.edge_owner_to_timeline_media.edges.node.video_url)
  			}
  		}

  	}

  })
  
});