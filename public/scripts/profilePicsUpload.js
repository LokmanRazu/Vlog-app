window.onload = function(){
    let baseCropping = $('#cropped-image').croppie({
        viewport:{
            width:200,
            height:200
        },
        boundary:{
            width:300,
            height:300
        },
        showZoomer:true
    })
    function readableFile(file){
        let reader = new FileReader()
        reader.onload = function(event){
            baseCropping.croppie('bind',{
                url:event.target.result
            }).then(()=>{
                $('.cr-slider').attr({
                    'min':0.5000,
                    'max':1.5000
                })
            })
        }
        reader.readableFile(file)
    }
    $('#profilePicsFile').on('change',function(e){
        if(this.files[0]){
            $('#crop-modal').modal({
                backdrop:'static',
                keyboard:false
            })
        }
    })
        $('#cancle-cropping').on('click',function(){
            $('#crop-modal').modal('hide')
            setTimeout(()=>{
                baseCropping.croppie('distroy')
            },1000)
        })
  
}