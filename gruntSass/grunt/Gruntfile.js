module.exports = function(grunt) {
	var distPath = "../public/dist/"
	,	srcPath ="../public/"
	,	scssSrcPath = srcPath+'scss/*.scss'
	,	cssDistPath = distPath+'scss/'
	,	jsSrcPath = srcPath+"js/*"
	,	jsDistPath = distPath+'js/script.js';


	grunt.initConfig({
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: [{ // C'est ici que l'on définit le dossier que l'on souhaite importer
					"expand": true,
					"cwd": scssSrcPath,
					"src": ["style.scss"],
					"dest": cssDistPath,
					"ext": ".css"
				}]
			}
		},
		concat: {
			options: {
				separator: ';', // permet d'ajouter un point-virgule entre chaque fichier concaténé.
			},
			dist: {
				src: [jsSrcPath], // la source
				dest: jsDistPath // la destination finale
			}
		},
		uglify: {
			options: {
				separator: ';'
			},
			dist: {
				src: [jsDistPath],
				dest: jsDistPath
			}
		},
		watch: {
			scripts: {
				files: jsSrcPath,
				tasks: ['concat:dist','uglify:dist']
			},
			sass: {
				files: scssSrcPath,
				tasks: ['sass:dist']
			}
		}
	});

	// Import du package
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('dist', ['sass:dist', 'concat:dist', 'uglify:dist', "watch"]);
	grunt.registerTask('default', ['dist']);
}