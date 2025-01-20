const portGif=document.getElementsByClassName('proj-gif');
//looping over gifs to grey them out when hovered. Indicates they are clickable
for(const element of portGif)
{
    element.addEventListener('mouseover', ()=>{
        element.style.filter='contrast(.5)';
     });
     element.addEventListener('mouseout', ()=>{
        element.style.filter='contrast(1)';
     });
}
 
