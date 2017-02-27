  function init() { 
    // get the blocks ids and hide them
    var block1 = document.getElementById('block1');
	var block2 = document.getElementById('block2');
	var block3 = document.getElementById('block3');
    block1.style.display = 'none';
    block2.style.display = 'none';
    block3.style.display = 'none';
    
  }  

 function toggleblock(nBlock) {
	// get the block
	var blockNumb = "block" + nBlock;
	var checkBoxNum = "checkbox" + nBlock;
	var tBlock = document.getElementById (blockNumb);
	
	// get the current value of the block display property
	var displaysetting = tBlock.style.display;
	
	// get the status of the checkbox
	var checkbox = document.getElementById(checkBoxNum);
	
	// now toggle the visibility of the block if checked
	 if (checkbox.checked) {
	 tBlock.style.display = 'block';
	 }
	 else {
	 tBlock.style.display = 'none';
	 }
 }
  
  window.onload=init;