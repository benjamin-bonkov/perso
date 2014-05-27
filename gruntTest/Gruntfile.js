module.exports = function(grunt) {

	// Configuration de Grunt
	grunt.initConfig({
		concat: {
		  options: {
		    separator: ';', // permet d'ajouter un point-virgule entre chaque fichier concaténé.
		  },
		  dist: {
		    src: ['public/**/*.js'], // la source
		    dest: 'dist/built.js' // la destination finale
		  }
		},
	    uglify: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['public/**/*.js'],
				dest: 'dist/built.js'
			}
		},
		watch: {
			scripts: {
				files: 'public/**/*.js',
				tasks: ['concat:dist']
			}
		}
	})

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch')

	// Définition des tâches Grunt
	grunt.registerTask('default', ['dev', 'watch'])
	grunt.registerTask('dev', ['concat:dist'])
	grunt.registerTask('dist', ['uglify:dist'])
}