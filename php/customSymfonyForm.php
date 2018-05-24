{{ form_start(form,{
        'attr': {'class': 'materialForm'}
}) }}

    <div class="form-group">
        {{ form_label(form.monInputTexte, null, {
            'label': 'label texte'
        }) }}
        {{ form_widget(form.monInputTexte,{
            'attr': {'class':'form-control'}
        }) }}
        <div class="form-errors">{{ form_errors(form.monInputTexte) }}</div>
    </div>

    <div class="form-group form-group--hasIcon">
    	{{ form_errors(form.customerId) }}
        <div class="iconBlock alignMiddle">
            <svg class="icon icon-envelope"><use xlink:href="#icon-envelope"/></svg>
        </div>
    	{{ form_widget(form.customerId,{
	            'attr': {'class': ''}
	    }) }}
        {{ form_label(form.customerId, null, {
	            'label_attr': {'class': 'control-label'}
	    }) }}<i class="bar"></i>
    </div>

	<div class="form-radio">
		{% for child in form.radio %}
		    <div class="radio">
		        <label>
		        	{{ form_widget(child, {'attr': { 'class': 'required', 'value': child.vars.value  } }) }}
			        <i class="helper"></i>
			        {{ child.vars.label }} 
			    </label>
		    </div>
		{% endfor %}
	</div>

    <div class="form-group text-center">
	    {{ form_widget(form.Valider,{
	        'attr': {'class': 'btn btn-red'}
	    }) }}
	</div>

	<div class="form-errors">{{ form_errors(form) }}</div>

{{ form_end(form) }}