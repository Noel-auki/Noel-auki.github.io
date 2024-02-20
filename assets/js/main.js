/*
	Eventually by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function() {

	"use strict";

	var	$body = document.querySelector('body');
	var joinWaitlistButton = document.getElementById('join-waitlist-btn');
    var header = document.getElementById('header');
    var signupForm = document.getElementById('signup-form');

	// Methods/polyfills.

		// classList | (c) @remy | github.com/remy/polyfills | rem.mit-license.org
			!function(){function t(t){this.el=t;for(var n=t.className.replace(/^\s+|\s+$/g,"").split(/\s+/),i=0;i<n.length;i++)e.call(this,n[i])}function n(t,n,i){Object.defineProperty?Object.defineProperty(t,n,{get:i}):t.__defineGetter__(n,i)}if(!("undefined"==typeof window.Element||"classList"in document.documentElement)){var i=Array.prototype,e=i.push,s=i.splice,o=i.join;t.prototype={add:function(t){this.contains(t)||(e.call(this,t),this.el.className=this.toString())},contains:function(t){return-1!=this.el.className.indexOf(t)},item:function(t){return this[t]||null},remove:function(t){if(this.contains(t)){for(var n=0;n<this.length&&this[n]!=t;n++);s.call(this,n,1),this.el.className=this.toString()}},toString:function(){return o.call(this," ")},toggle:function(t){return this.contains(t)?this.remove(t):this.add(t),this.contains(t)}},window.DOMTokenList=t,n(Element.prototype,"classList",function(){return new t(this)})}}();

		// canUse
			window.canUse=function(p){if(!window._canUse)window._canUse=document.createElement("div");var e=window._canUse.style,up=p.charAt(0).toUpperCase()+p.slice(1);return p in e||"Moz"+up in e||"Webkit"+up in e||"O"+up in e||"ms"+up in e};

		// window.addEventListener
			(function(){if("addEventListener"in window)return;window.addEventListener=function(type,f){window.attachEvent("on"+type,f)}})();

	// Play initial animations on page load.
		window.addEventListener('load', function() {
			window.setTimeout(function() {
				$body.classList.remove('is-preload');
			}, 100);
		});

	// Slideshow Background.
		(function() {

			// Settings.
				var settings = {

					// Images (in the format of 'url': 'alignment').
						images: {
							'images/bg01.jpg': 'center',
							'images/bg02.jpg': 'center',
							'images/bg03.jpg': 'center'
						},

					// Delay.
						delay: 6000

				};

			// Vars.
				var	pos = 0, lastPos = 0,
					$wrapper, $bgs = [], $bg,
					k, v;

			// Create BG wrapper, BGs.
				$wrapper = document.createElement('div');
					$wrapper.id = 'bg';
					$body.appendChild($wrapper);

				for (k in settings.images) {

					// Create BG.
						$bg = document.createElement('div');
							$bg.style.backgroundImage = 'url("' + k + '")';
							$bg.style.backgroundPosition = settings.images[k];
							$wrapper.appendChild($bg);

					// Add it to array.
						$bgs.push($bg);

				}

			// Main loop.
				$bgs[pos].classList.add('visible');
				$bgs[pos].classList.add('top');

				// Bail if we only have a single BG or the client doesn't support transitions.
					if ($bgs.length == 1
					||	!canUse('transition'))
						return;

				window.setInterval(function() {

					lastPos = pos;
					pos++;

					// Wrap to beginning if necessary.
						if (pos >= $bgs.length)
							pos = 0;

					// Swap top images.
						$bgs[lastPos].classList.remove('top');
						$bgs[pos].classList.add('visible');
						$bgs[pos].classList.add('top');

					// Hide last image after a short delay.
						window.setTimeout(function() {
							$bgs[lastPos].classList.remove('visible');
						}, settings.delay / 2);

				}, settings.delay);

		})();

		joinWaitlistButton.addEventListener('click', function() {
			// Fade out the header before updating content
			header.style.opacity = 0;
		
			// Wait for the fade-out animation to complete
			setTimeout(function() {
				// Update header content
				header.innerHTML = '<h1>Join Waitlist</h1>' +
					'<p>Be the first to checkmate your neighborhood!</p>';
		
				// Reset min-height for the paragraph if needed
				var newParagraph = document.querySelector('#header p');
				if(newParagraph) {
					newParagraph.style.minHeight = '0';
				}
		
				// Fade in the updated content
				header.style.opacity = 1;
		
				// Show the signup form
				signupForm.style.display = '';
		
				// Optionally, remove the join waitlist button
				joinWaitlistButton.style.display = 'none';
			}, 500); // Adjust this timeout to match the fade-out duration
		});
		
		
		

	// Signup Form.
		(function() {

			// Vars.
				var $form = document.querySelectorAll('#signup-form')[0],
					$submit = document.querySelectorAll('#signup-form input[type="submit"]')[0],
					$message;

			// Bail if addEventListener isn't supported.
				if (!('addEventListener' in $form))
					return;

			// Message.
				$message = document.createElement('span');
					$message.classList.add('message');
					$form.appendChild($message);

				$message._show = function(type, text) {

					$message.innerHTML = text;
					$message.classList.add(type);
					$message.classList.add('visible');

					window.setTimeout(function() {
						$message._hide();
					}, 3000);

				};

				$message._hide = function() {
					$message.classList.remove('visible');
				};

			// Events.
			// Note: If you're *not* using AJAX, get rid of this event listener.
				$form.addEventListener('submit', function(event) {

					event.stopPropagation();
					event.preventDefault();

					// Hide message.
						$message._hide();

					// Disable submit.
						$submit.disabled = true;

					// Process form.
					// Note: Doesn't actually do anything yet (other than report back with a "thank you"),
					// but there's enough here to piece together a working AJAX submission call that does.
						window.setTimeout(function() {

							// Reset form.
								$form.reset();

							// Enable submit.
								$submit.disabled = false;

							// Show message.
								$message._show('success', 'Thank you!');
								//$message._show('failure', 'Something went wrong. Please try again.');

						}, 750);

				});

		})();

})();


// document.addEventListener('DOMContentLoaded', function() {
//     var pawn = document.getElementById('pawn');
//     var end = document.getElementById('end');
//     var header = document.getElementById('header');
//     var signupForm = document.getElementById('signup-form');
//     var footer = document.getElementById('footer');
//     var chessboard = document.getElementById('chessboard');
// 	var instruction = document.getElementById('instruction');

//     // Function to reveal content smoothly
// 	function revealContent() {
// 		// Apply fade-out effect to chessboard
// 		chessboard.style.opacity = '0'
// 		instruction.style.opacity = '0';
	
// 		// Wait for the fade-out transition to finish before hiding and showing content
// 		setTimeout(function() {
// 			chessboard.style.display = 'none'; // Completely hide the chessboard
// 			instruction.style.display = 'none';
	
// 			// Prepare elements for fade-in
// 			header.style.opacity = '0';
// 			header.style.display = 'block';
// 			footer.style.opacity = '0';
// 			footer.style.display = 'block';
	
// 			// Start the fade-in effect for header, signupForm, and footer
// 			setTimeout(function() {
// 				header.style.opacity = '1';
// 				signupForm.style.opacity = '1';
// 				footer.style.opacity = '1';
// 			}, 10); // Short delay to ensure properties are applied
	
// 		}, 1000); // This delay should match the CSS transition timing for the chessboard
// 	}
	
// 	// Event listeners for pawn interaction remain unchanged
	
	

//     // Desktop: Drag and Drop
//     pawn.addEventListener('dragstart', function(event) {
//         event.dataTransfer.setData('text/plain', null);
//     });
//     end.addEventListener('dragover', function(event) {
//         event.preventDefault();
//     });
//     end.addEventListener('drop', function(event) {
//         event.preventDefault();
//         end.appendChild(pawn); // Move the pawn to the end square
//         revealContent();
//     });

//     // Mobile: Tap
//     pawn.addEventListener('touchend', function(event) {
//         end.appendChild(pawn); // Visual indication that pawn has moved
//         revealContent();
//     });

//     // Initially hide the main content
//     header.style.display = 'none';
//     signupForm.style.display = 'none';
//     footer.style.display = 'none';
// });
document.addEventListener('DOMContentLoaded', function() {
    var pawn = document.getElementById('pawn');
    var start = document.getElementById('start');
    var end = document.getElementById('end');
    var header = document.getElementById('header');
    var signupForm = document.getElementById('signup-form');
    var footer = document.getElementById('footer');
    var chessboard = document.getElementById('chessboard');
	var instruction = document.getElementById('instruction');

    function movePawn(target) {
        if (target === start || target === end) {
            target.appendChild(pawn); // Move the pawn to the target square
        }
        revealContent(); // Proceed to reveal the content
    }

    function revealContent() {
        // Fade out effect for chessboard and instruction
        chessboard.style.opacity = '0';
		instruction.style.opacity = '0';

        setTimeout(function() {
            chessboard.style.display = 'none';
			instruction.style.display = 'none';

            // Prepare elements for fade-in
            header.style.opacity = '0';
            header.style.display = 'block';
            footer.style.opacity = '0';
            footer.style.display = 'block';

            // Fade-in effect for content
            setTimeout(function() {
                header.style.opacity = '1';
                signupForm.style.opacity = '1';
                footer.style.opacity = '1';
				startTypewriterEffect();
            }, 10);
        }, 1000); // Match this delay with your CSS transition
    }

    // Drag and Drop for Desktop
    pawn.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData('text/plain', null); // Necessary for Firefox
    });

    // Allow both start and end as valid drop targets
    var dropTargets = [start, end];
    dropTargets.forEach(function(target) {
        target.addEventListener('dragover', function(event) {
            event.preventDefault(); // Allow dropping
        });

        target.addEventListener('drop', function(event) {
            event.preventDefault();
            movePawn(target); // Move the pawn based on the drop target
        });
    });

    // Touch Event for Mobile
    pawn.addEventListener('touchend', function() {
        // Determine if the touchend event is closer to start or end to decide the move
        // This is a simple approach, you might need to enhance this based on your layout
        var touchEndClosest = (Math.abs(pawn.getBoundingClientRect().top - start.getBoundingClientRect().top) < Math.abs(pawn.getBoundingClientRect().top - end.getBoundingClientRect().top)) ? start : end;
        movePawn(touchEndClosest);
    });

    // Initially hide the main content
    header.style.display = 'none';
    signupForm.style.display = 'none';
    footer.style.display = 'none';
});



function startTypewriterEffect() {
	   // Target both elements
	   var typewriterHeader = document.querySelector('#header h1');
	   var typewriterParagraph = document.querySelector('#header p');
   
	   // Text content for both elements
	   var headerText = typewriterHeader.innerText;
	   var paragraphText = typewriterParagraph.innerHTML; // Using innerHTML to include <br> tags
   
	   // Typing speed in milliseconds
	   var headerTypingSpeed = 150; // Original typing speed for header
	   var paragraphTypingSpeed = 30; // Increased typing speed for paragraph
   
	   // Clear initial text content
	   typewriterHeader.innerText = '';
	   typewriterParagraph.innerHTML = '';
   
	   // Typewriter effect function with adjustable typing speed
	   function typeWriter(element, text, i, typingSpeed, isParagraph = false) {
		   if (i < text.length) {
			   if(isParagraph && text.charAt(i) === '<' && text.substring(i, i+4) === '<br>') {
				   element.innerHTML += '<br>';
				   i += 4; // Skip the <br> tag characters
			   } else {
				   element.innerHTML += text.charAt(i);
				   i++;
			   }
			   setTimeout(function() {
				   typeWriter(element, text, i, typingSpeed, isParagraph);
			   }, typingSpeed);
		   }
	   }
   
	   // Initiate typewriting effect for header with its specific speed
	   typeWriter(typewriterHeader, headerText, 0, headerTypingSpeed);
   
	   // Initiate typewriting effect for paragraph with its specific speed
	   // Optionally, delay the start until the header is complete
	   setTimeout(function() {
		   typeWriter(typewriterParagraph, paragraphText, 0, paragraphTypingSpeed, true);
	   }, headerText.length * headerTypingSpeed);
}



