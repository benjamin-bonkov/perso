$(document).ready(function(){
	$("html").removeClass("no-js");

	//drag n drop
		// ajoute la propriété pour le drop et le transfert de données
		$.event.props.push('dataTransfer');

		var i, $this, $log = $('#log');
 		
	    $('#liste li').on({
	        // on commence le drag
	        dragstart: function(e) {
	            $this = $(this);
	 
	            i = $this.index();
	            $this.css('opacity', '0.5');
	 
	            // on garde le texte en mémoire (A, B, C ou D)
	            e.dataTransfer.setData('text', $this.text());
	        },
	        // on passe sur un élément draggable
	        dragenter: function(e) {
	            // on augmente la taille pour montrer le draggable
	            $(this).animate({
	                width: '90px'
	            }, 'fast');
	 
	            e.preventDefault();
	        },
	        // on quitte un élément draggable
	        dragleave: function() {
	            // on remet la taille par défaut
	            $(this).animate({
	                width: '75px'
	            }, 'fast');
	        },
	        // déclenché tant qu on a pas lâché l élément
	        dragover: function(e) {
	            e.preventDefault();
	        },
	        // on lâche l élément
	        drop: function(e) {
	            // si l élément sur lequel on drop n'est pas l'élément de départ
	            if (i !== $(this).index()) {
	                // on récupère le texte initial
	                var data = e.dataTransfer.getData('text');
	 
	                // on log
	                $log.html(data + ' > ' + $(this).text()).fadeIn('slow').delay(1000).fadeOut();
	 
	                // on met le nouveau texte à la place de l ancien et inversement
	                $this.text($(this).text());
	                $(this).text(data);
	            }
	 
	            // on remet la taille par défaut
	            $(this).animate({
	                width: '75px'
	            }, 'fast');
	        },
	        // fin du drag (même sans drop)
	        dragend: function() {
	            $(this).css('opacity', '1');
	        },
	        // au clic sur un élément
	        click: function() {
	            alert($(this).text());
	        }
	    });
});