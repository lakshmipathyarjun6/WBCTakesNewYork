// *******************************************************
// CS 174a Graphics Example Code
// animation.js - The main file and program start point.  The class definition here describes how to display an Animation and how it will react to key and mouse input.  Right now it has 
// very little in it - you will fill it in with all your shape drawing calls and any extra key / mouse controls.  

// Now go down to display() to see where the sample shapes are drawn, and to see where to fill in your own code.

"use strict"
var canvas, canvas_size, gl = null, g_addrs,
	movement = vec2(),	thrust = vec3(), 	looking = false, prev_time = 0, animate = false, animation_time = 0;
		var gouraud = false, color_normals = false, solid = false;
var sound;
var opening_sound;

		
// *******************************************************	
// When the web page's window loads it creates an Animation object, which registers itself as a displayable object to our other class GL_Context -- which OpenGL is told to call upon every time a
// draw / keyboard / mouse event happens.

window.onload = function init() {	var anim = new Animation();	}
function Animation()
{
	( function init (self) 
	{
		self.context = new GL_Context( "gl-canvas" );
		self.context.register_display_object( self );
		
		gl.clearColor( 0, 0, 0, 1 );			// Background color

		self.m_cube = new cube();
		self.m_axis = new axis();
		self.m_sphere = new sphere( mat4(), 4 );	
		self.m_fan = new triangle_fan_full( 10, mat4() );
		self.m_strip = new rectangular_strip( 1, mat4() );
		self.m_cylinder = new cylindrical_strip( 10, mat4() );
     
        self.m_triangle = new triangle(mat4());
        self.m_windmill = new windmill(mat4());
        self.m_halfcube = new halfcube(mat4());
        self.m_capped_cylinder = new capped_cylinder();
        self.m_torus = new torus();
        self.m_megaphone_frustum = new frustum(20,mat4(),0.9,0.2);
        self.m_clothing_frustum = new frustum(20,mat4(),2,1.2);
     
        self.up_vec = vec3(0,1,0);
        self.framerate = 0;
        self.animation_delta_time = 0;
     
        opening_sound = new Audio('Opening.mp3');
        sound = new Audio('HolyShit.mp3');
     
        // WBC Person Animation timing variables
        self.vec_prev = mat4();
        self.megaphone_prev_vec = mat4();
        self.prev_megaphone_arm_rotation = -80;
        self.prev_eyebrow_location_right = -35;
        self.prev_eyebrow_location_left = 35;
        self.eye_scale = 0.2;
     
        // Jesus Timing Variables
        self.prev_finger_base_location = 70;
        self.vec_prev_jesus = mat4();
     
        // Scene 2.5 Camera Up Pan Variables
     
        self.relative_time_2 = 0;
        self.relative_time_2_5 = 0;
        self.relative_time_3 = 0;
        self.relative_time_4 = 0;
        self.relative_time_final = 0;
     
        // My arrays of people for each scene
     
        self.scene_one_people = [];
     
        for(var i = 0; i < 50; i++) {
            var start_rot = Math.floor(Math.random()*(180 + 180 + 1)) - 180;
            var dist = Math.floor(Math.random()*(90 - 40 + 1)) + 40;
            var facing_rot = Math.floor(Math.random()*(180 + 180 + 1)) - 180;
            var face = Math.floor(Math.random()*(8 - 1 + 1)) + 1;
            var sweater_num = Math.floor(Math.random()*(3 - 1 + 1)) + 1;
            var jeans_num = Math.floor(Math.random()*(3 - 1 + 1)) + 1;
            var sweater = "";
            var jeans = "";
     
            switch(sweater_num) {
                case 1:
                    sweater = "GreySweater";
                    break;
                case 2:
                    sweater = "BlueSweater";
                    break;
                default:
                    sweater = "RedSweater";
                    break;
            }
     
            switch(jeans_num) {
                case 1:
                    jeans = "BlueJeans";
                    break;
                case 2:
                    jeans = "DarkBlueJeans";
                    break;
                default:
                    jeans = "BlackJeans";
                    break;
            }
     
            self.scene_one_people[i] = vec6(start_rot,dist,facing_rot,face,sweater,jeans);
     
        }
     
        self.scene_two_people = [];
     
        for(var i = 0; i < 20; i++) {
            var start_rot = Math.floor(Math.random()*(45 + 70 + 1)) - 70;
            var dist = Math.floor(Math.random()*(90 - 50 + 1)) + 50;
            var facing_rot = Math.floor(Math.random()*(90 + 135 + 1)) - 135;
            var face = Math.floor(Math.random()*(8 - 1 + 1)) + 1;
            var sweater_num = Math.floor(Math.random()*(3 - 1 + 1)) + 1;
            var jeans_num = Math.floor(Math.random()*(3 - 1 + 1)) + 1;
            var sweater = "";
            var jeans = "";
     
            switch(sweater_num) {
                case 1:
                    sweater = "GreySweater";
                    break;
                case 2:
                    sweater = "BlueSweater";
                    break;
                default:
                    sweater = "RedSweater";
                    break;
            }
     
            switch(jeans_num) {
                case 1:
                    jeans = "BlueJeans";
                    break;
                case 2:
                    jeans = "DarkBlueJeans";
                    break;
                default:
                    jeans = "BlackJeans";
                    break;
            }
     
            self.scene_two_people[i] = vec6(start_rot,dist,facing_rot,face,sweater,jeans);
     
        }
     
        self.scene_twopointfive_people = [];
     
        for(var i = 0; i < 20; i++) {
            var start_rot = Math.floor(Math.random()*(250 - 130 + 1)) + 130;
            var dist = Math.floor(Math.random()*(90 - 40 + 1)) + 40;
            var facing_rot = Math.floor(Math.random()*(90 + 135 + 1)) - 135;
            var face = Math.floor(Math.random()*(8 - 1 + 1)) + 1;
            var sweater_num = Math.floor(Math.random()*(3 - 1 + 1)) + 1;
            var jeans_num = Math.floor(Math.random()*(3 - 1 + 1)) + 1;
            var sweater = "";
            var jeans = "";
     
            switch(sweater_num) {
                case 1:
                    sweater = "GreySweater";
                    break;
                case 2:
                    sweater = "BlueSweater";
                    break;
                default:
                    sweater = "RedSweater";
                    break;
            }
     
            switch(jeans_num) {
                case 1:
                    jeans = "BlueJeans";
                    break;
                case 2:
                    jeans = "DarkBlueJeans";
                    break;
                default:
                    jeans = "BlackJeans";
                    break;
            }
     
            self.scene_twopointfive_people[i] = vec6(start_rot,dist,facing_rot,face,sweater,jeans);
     
        }
     
        self.scene_three_people = [];
     
        for(var i = 0; i < 20; i++) {
            var start_rot = Math.floor(Math.random()*(-45 + 135 + 1)) - 135;
            var dist = Math.floor(Math.random()*(90 - 40 + 1)) + 40;
            var facing_rot = Math.floor(Math.random()*(90 + 135 + 1)) - 135;
            var face = Math.floor(Math.random()*(8 - 1 + 1)) + 1;
            var sweater_num = Math.floor(Math.random()*(3 - 1 + 1)) + 1;
            var jeans_num = Math.floor(Math.random()*(3 - 1 + 1)) + 1;
            var sweater = "";
            var jeans = "";
     
            switch(sweater_num) {
                case 1:
                    sweater = "GreySweater";
                    break;
                case 2:
                    sweater = "BlueSweater";
                    break;
                default:
                    sweater = "RedSweater";
                    break;
            }
     
            switch(jeans_num) {
                case 1:
                    jeans = "BlueJeans";
                    break;
                case 2:
                    jeans = "DarkBlueJeans";
                    break;
                default:
                    jeans = "BlackJeans";
                    break;
            }
     
            self.scene_three_people[i] = vec6(start_rot,dist,facing_rot,face,sweater,jeans);
     
        }
    
     
     
		self.camera_transform = translate(0, 0,-40);
		self.projection_transform = perspective(45, canvas.width/canvas.height, .1, 250);		// The matrix that determines how depth is treated.  It projects 3D points onto a plane.
		
		gl.uniform1i( g_addrs.GOURAUD_loc, gouraud);		gl.uniform1i( g_addrs.COLOR_NORMALS_loc, color_normals);		gl.uniform1i( g_addrs.SOLID_loc, solid);
		
        self.animation_time = 0;
		self.context.render();	
	} ) ( this );	
	
	canvas.addEventListener('mousemove', function(e)	{		e = e || window.event;		movement = vec2( e.clientX - canvas.width/2, e.clientY - canvas.height/2, 0);	});
}

// *******************************************************	
// init_keys():  Define any extra keyboard shortcuts here
Animation.prototype.init_keys = function()
{
	shortcut.add( "Space", function() { thrust[1] = -1; } );			shortcut.add( "Space", function() { thrust[1] =  0; }, {'type':'keyup'} );
	shortcut.add( "z",     function() { thrust[1] =  1; } );			shortcut.add( "z",     function() { thrust[1] =  0; }, {'type':'keyup'} );
	shortcut.add( "w",     function() { thrust[2] =  1; } );			shortcut.add( "w",     function() { thrust[2] =  0; }, {'type':'keyup'} );
	shortcut.add( "a",     function() { thrust[0] =  1; } );			shortcut.add( "a",     function() { thrust[0] =  0; }, {'type':'keyup'} );
	shortcut.add( "s",     function() { thrust[2] = -1; } );			shortcut.add( "s",     function() { thrust[2] =  0; }, {'type':'keyup'} );
	shortcut.add( "d",     function() { thrust[0] = -1; } );			shortcut.add( "d",     function() { thrust[0] =  0; }, {'type':'keyup'} );
	shortcut.add( "f",     function() { looking = !looking; } );
	shortcut.add( ",",     ( function(self) { return function() { self.camera_transform = mult( rotate( 3, 0, 0,  1 ), self.camera_transform ); }; } ) (this) ) ;
	shortcut.add( ".",     ( function(self) { return function() { self.camera_transform = mult( rotate( 3, 0, 0, -1 ), self.camera_transform ); }; } ) (this) ) ;

	shortcut.add( "r",     ( function(self) { return function() { self.camera_transform = mat4(); }; } ) (this) );
	shortcut.add( "ALT+s", function() { solid = !solid;					gl.uniform1i( g_addrs.SOLID_loc, solid);	
																		gl.uniform4fv( g_addrs.SOLID_COLOR_loc, vec4(Math.random(), Math.random(), Math.random(), 1) );	 } );
	shortcut.add( "ALT+g", function() { gouraud = !gouraud;				gl.uniform1i( g_addrs.GOURAUD_loc, gouraud);	} );
	shortcut.add( "ALT+n", function() { color_normals = !color_normals;	gl.uniform1i( g_addrs.COLOR_NORMALS_loc, color_normals);	} );
	shortcut.add( "ALT+a", function() { animate = !animate; } );
	
	shortcut.add( "p",     ( function(self) { return function() { self.m_axis.basis_selection++; console.log("Selected Basis: " + self.m_axis.basis_selection ); }; } ) (this) );
	shortcut.add( "m",     ( function(self) { return function() { self.m_axis.basis_selection--; console.log("Selected Basis: " + self.m_axis.basis_selection ); }; } ) (this) );	
}

function update_camera( self, animation_delta_time )
	{
		var leeway = 70, border = 50;
		var degrees_per_frame = .0005 * animation_delta_time;
		var meters_per_frame  = .03 * animation_delta_time;
																					// Determine camera rotation movement first
		var movement_plus  = [ movement[0] + leeway, movement[1] + leeway ];		// movement[] is mouse position relative to canvas center; leeway is a tolerance from the center.
		var movement_minus = [ movement[0] - leeway, movement[1] - leeway ];
		var outside_border = false;
		
		for( var i = 0; i < 2; i++ )
			if ( Math.abs( movement[i] ) > canvas_size[i]/2 - border )	outside_border = true;		// Stop steering if we're on the outer edge of the canvas.

		for( var i = 0; looking && outside_border == false && i < 2; i++ )			// Steer according to "movement" vector, but don't start increasing until outside a leeway window from the center.
		{
			var velocity = ( ( movement_minus[i] > 0 && movement_minus[i] ) || ( movement_plus[i] < 0 && movement_plus[i] ) ) * degrees_per_frame;	// Use movement's quantity unless the &&'s zero it out
			self.camera_transform = mult( rotate( velocity, i, 1-i, 0 ), self.camera_transform );			// On X step, rotate around Y axis, and vice versa.
		}
		self.camera_transform = mult( translate( scale_vec( meters_per_frame, thrust ) ), self.camera_transform );		// Now translation movement of camera, applied in local camera coordinate frame
	}

// *******************************************************	
// display(): called once per frame, whenever OpenGL decides it's time to redraw.

Animation.prototype.display = function(time)
	{
		if(!time) time = 0;
		this.animation_delta_time = time - prev_time;
		if(animate) this.animation_time += this.animation_delta_time;
		prev_time = time;
        
        this.framerate = 1000/this.animation_delta_time;
		
		update_camera( this, this.animation_delta_time );
			
		var basis_id = 0;
		
		var model_transform = mat4();
		
        this.drawBackground(model_transform);
        this.animationController(model_transform,this.camera_transform);
		
	}

Animation.prototype.animationController = function (model_transform,camera_transform) {
    // This function breaks the movie apart into different scenes based on the animation time
    
    this.stack = [];
    this.current_time = this.animation_time/1000;
    
    // Time 0 - Time t1
    // Runtime: 12 s
    if(this.current_time <= 12)
        this.drawSceneOne(model_transform,0);

    // Time t2 - Time t3
    // Runtime: 13.2 s
    else if(this.current_time <= 25.2)
        this.drawSceneTwo(model_transform,12);
    
    else if(this.current_time <= 36)
        this.drawSceneTwoPointFive(model_transform,25.2);
    
    // Time t3 - Time t4
    // Runtime: 10 s
    else if(this.current_time <= 46)
        this.drawSceneThree(model_transform,36);
    
    // Time t4 - Time t5
    // Runtime: 29 s
    else if(this.current_time <= 69)
        this.drawSceneFour(model_transform,46);
    
    // Time t5 - End of film
    // Runtime: Not relevant
    else
        this.drawFinalScene(model_transform,69);
}

Animation.prototype.drawSceneOne = function (model_transform,start_time) {

    for(var i = 0; i < this.scene_one_people.length; i++)
    {
        this.stack.push(model_transform);
            model_transform = mult(model_transform,rotate(this.scene_one_people[i][0],0,1,0));
            model_transform = mult(model_transform,translate(0,0,this.scene_one_people[i][1]));
            model_transform = mult(model_transform,rotate(this.scene_one_people[i][2],0,1,0));
            this.drawRandomPerson(model_transform,true,this.scene_one_people[i][3],this.scene_one_people[i][4],this.scene_one_people[i][5],true,this.animation_time);
        model_transform = this.stack.pop();
    }
    
    // Pan camera around point
    this.camera_transform = lookAt(vec3(Math.sin(this.animation_time * .0005) * 50, 30, Math.cos(this.animation_time * .0005) * 50), vec3(0,0,0), vec3(0,1,0) );
    
    if(animate)
        opening_sound.play();
    
    // Animation: WBC member preaching
    var rot = 20*Math.sin(this.animation_time/1000);
    model_transform = mult(model_transform,rotate(rot,0,1,0));
    this.drawChristianEvangelicalPerson(model_transform);
    
}

Animation.prototype.drawSceneTwo = function (model_transform,start_time) {
    
    if(animate)
        this.relative_time_2 += this.animation_delta_time;
    
    for(var i = 0; i < this.scene_two_people.length; i++)
    {
        this.stack.push(model_transform);
            model_transform = mult(model_transform,rotate(this.scene_two_people[i][0],0,1,0));
            model_transform = mult(model_transform,translate(0,0,this.scene_two_people[i][1]));
            model_transform = mult(model_transform,rotate(this.scene_two_people[i][2],0,1,0));
            this.drawRandomPerson(model_transform,true,this.scene_two_people[i][3],this.scene_two_people[i][4],this.scene_two_people[i][5],true,this.relative_time_2);
        model_transform = this.stack.pop();
    }
    
    // Delay 2 s
    if(this.current_time <= (start_time + 2)) {
        this.stack.push(model_transform);
            var rot = 20*Math.sin(this.animation_time/1000);
            model_transform = mult(model_transform,rotate(rot,0,1,0));
            this.drawChristianEvangelicalPerson(model_transform);
        model_transform = this.stack.pop();
        
        this.camera_transform = lookAt(vec3(3.4,3,-4.52),vec3(0,0,0),this.up_vec);
    }
    
    // Animation: Jesus tapping WBC person on back
    // Run time: 4.8 s
    else if(this.current_time <= (start_time + 6.8)) {
        this.stack.push(model_transform)
            var rot = 20*Math.sin(this.animation_time/1000);
            model_transform = mult(model_transform,rotate(rot,0,1,0));
            this.drawChristianEvangelicalPerson(model_transform);
            this.vec_prev = model_transform;
        model_transform = this.stack.pop();
    
        this.camera_transform = lookAt(vec3(3.4,3,-4.52),vec3(0,0,0),this.up_vec);
        model_transform = mult(model_transform,translate(3,0,-6.72));
        this.drawJesus(model_transform,true,0);
    }
    
    // Animation: WBC Person lowers megaphone and locks it in that poition. He also stops talking about god hating fags and that everyone is going to hell
    // Run time: 1.45 s
    else if(this.current_time <= (start_time + 8.25)) {
        this.drawChristianEvangelicalPerson(this.vec_prev,true);
        
        this.camera_transform = lookAt(vec3(3,3,-4.72),vec3(0,4,0),this.up_vec);
        model_transform = mult(model_transform,translate(3,0,-6.72));
        this.drawJesus(model_transform,false,0);
    }
    
    // Animation: WBC Person rotates to face Jesus
    // Run time: 4.15 s
    else if(this.current_time <= (start_time + 12.4)){
        
        if(animate) {
            var rot = 40*(this.animation_delta_time/1000);
            this.vec_prev = mult(this.vec_prev,rotate(rot,0,1,0));
        }
        this.drawChristianEvangelicalPerson(this.vec_prev);
        
        this.camera_transform = lookAt(vec3(3,3,-4.72),vec3(0,4,0),this.up_vec);
        model_transform = mult(model_transform,translate(3,0,-6.72));
        this.drawJesus(model_transform,false,0);
        
    }
    
    // Animation: WBC Person's eyebrows raise and lock in positions
    // Run time: 0.9 s
    else if(this.current_time <= (start_time + 12.9)){
        
        this.drawChristianEvangelicalPerson(this.vec_prev,false,false,true);
        
        this.camera_transform = lookAt(vec3(3,3,-4.72),vec3(0,4,0),this.up_vec);
        model_transform = mult(model_transform,translate(3,0,-6.72));
        this.drawJesus(model_transform,false,0);

    }
    
    // Delay 0.3 s
    else {
        this.drawChristianEvangelicalPerson(this.vec_prev);
        
        this.camera_transform = lookAt(vec3(3,3,-4.72),vec3(0,4,0),this.up_vec);
        model_transform = mult(model_transform,translate(3,0,-6.72));
        this.drawJesus(model_transform,false,0);
    }
    
    // Runtime: 13.2 s
    
}

Animation.prototype.drawSceneTwoPointFive = function (model_transform,start_time) {
    
    // Animation: Pan Up View of Jesus Mothaphuckin' Christ
    // Run time: 10.8 s
    
    if(animate)
        this.relative_time_2_5 += this.animation_delta_time;
    
    for(var i = 0; i < this.scene_twopointfive_people.length; i++)
    {
        this.stack.push(model_transform);
        model_transform = mult(model_transform,rotate(this.scene_twopointfive_people[i][0],0,1,0));
        model_transform = mult(model_transform,translate(0,0,this.scene_twopointfive_people[i][1]));
        model_transform = mult(model_transform,rotate(this.scene_twopointfive_people[i][2],0,1,0));
        this.drawRandomPerson(model_transform,true,this.scene_twopointfive_people[i][3],this.scene_twopointfive_people[i][4],this.scene_twopointfive_people[i][5],true,this.relative_time_2_5);
        model_transform = this.stack.pop();
    }
    
    model_transform = mult(model_transform,translate(3,0,-6.72));
    model_transform = mult(model_transform,rotate(-20,0,1,0));
    this.drawJesus(model_transform,false,0);
    
    this.camera_transform = lookAt(vec3(-2, (-8 + (this.relative_time_2_5 * .00001) * 100), 7), vec3(1 , (-8 + (this.relative_time_2_5 * .00001) * 100), -3), vec3(0,1,0) );
    
    // Runtime: 10.8 s
    
}

Animation.prototype.drawSceneThree = function (model_transform,start_time) {
    
    // Camera Location: Fixed behind WBC person / facing pope
    // To Draw: WBC Person, Jesus
    
    // Jesus: tap back, prepare to scold, wag finger
    // WBC: Megaphone,mouth,eyebrows,eyes
    
    if(animate)
        this.relative_time_3 += this.animation_delta_time;
    
    for(var i = 0; i < this.scene_three_people.length; i++)
    {
        this.stack.push(model_transform);
        model_transform = mult(model_transform,rotate(this.scene_three_people[i][0],0,1,0));
        model_transform = mult(model_transform,translate(0,0,this.scene_twopointfive_people[i][1]));
        model_transform = mult(model_transform,rotate(this.scene_three_people[i][2],0,1,0));
        this.drawRandomPerson(model_transform,true,this.scene_three_people[i][3],this.scene_three_people[i][4],this.scene_three_people[i][5],true,this.relative_time_3);
        model_transform = this.stack.pop();
    }
    
    // Animation: Jesus brings finger to wagging position (not locking)
    // Run time: 1.3 s
    if(this.current_time <= (start_time + 1.3)) {
        this.drawChristianEvangelicalPerson(this.vec_prev);
        model_transform = mult(model_transform,translate(3,0,-6.72));
        model_transform = mult(model_transform,rotate(-20,0,1,0));
        this.camera_transform = lookAt(vec3(10,4,0), vec3(0,4,-3.72),this.up_vec);
        if(animate)
            this.drawJesus(model_transform,false,-62/this.framerate);
        else
            this.drawJesus(model_transform,false,0);
        this.vec_prev_jesus = model_transform;
    }
    
    // Animation: Jesus wags finger
    // Run time: 2.7 s
    else if(this.current_time <= (start_time + 4)){
        this.drawChristianEvangelicalPerson(this.vec_prev);
        this.drawJesus(this.vec_prev_jesus,false,0,true);
        this.camera_transform = lookAt(vec3(10,4,0), vec3(0,4,-3.72),this.up_vec);
    }
    
    // Animation: Jesus rotates to point out something
    // Run time: 1.5 s
    else if(this.current_time <= (start_time + 5.5)){
        
        this.drawChristianEvangelicalPerson(this.vec_prev);
        this.camera_transform = lookAt(vec3(10,4,0), vec3(0,4,-3.72),this.up_vec);
        var rot = 0;
        if (animate)
            rot = 70*(this.animation_delta_time/1000);
        this.vec_prev_jesus = mult(this.vec_prev_jesus,rotate(rot,0,1,0));
        this.drawJesus(this.vec_prev_jesus,false,0);
        
    }
    
    // Animation: Jesus points to something
    // Run time: 1.7 s
    else if(this.current_time <= (start_time + 7.2)){
        
        this.drawChristianEvangelicalPerson(this.vec_prev);
        this.camera_transform = lookAt(vec3(10,4,0), vec3(0,4,-3.72),this.up_vec);
        if(animate)
            this.drawJesus(this.vec_prev_jesus,false,62/this.framerate);
        else
            this.drawJesus(this.vec_prev_jesus,false,0);
        
    }
    
    // Animation: Naturally, the WBC person listens to the supposed son of God
    // Run time: 1.6 s
    else if(this.current_time <= (start_time + 8.8)){
        
        var rot = 0;
        if(animate)
            var rot = -40*(this.animation_delta_time/1000);
        this.vec_prev = mult(this.vec_prev,rotate(rot,0,1,0));
        this.drawChristianEvangelicalPerson(this.vec_prev);
        
        this.camera_transform = lookAt(vec3(10,4,0), vec3(0,4,-3.72),this.up_vec);
        this.drawJesus(this.vec_prev_jesus,false,0);
        
    }
    
    else if(this.current_time <= (start_time + 8.85)){
        
        this.drawChristianEvangelicalPerson(this.vec_prev,false,false,false,true);
        this.camera_transform = lookAt(vec3(10,4,0), vec3(0,4,-3.72),this.up_vec);
        this.drawJesus(this.vec_prev_jesus,false,1);
        
    }
    
    // Delay 1.15 s
    else {
        
        this.drawChristianEvangelicalPerson(this.vec_prev);
        this.drawJesus(this.vec_prev_jesus,false,0);
        
    }
    
    // Runtime: 10 s
    
}

Animation.prototype.drawSceneFour = function (model_transform,start_time) {
    
    // Alarmed with disbelief, the representative slowly looks around to find that he is surrounded by a fairly threatening mob. He then proceeds to say 'HOLY SHIT'
    
    for(var i = 0; i < 360; i+=20) {
        this.stack.push(model_transform);
        model_transform = mult(model_transform,rotate(i,0,1,0));
        model_transform = mult(model_transform,translate(0,0,30));
        model_transform = mult(model_transform,rotate(180,0,1,0));
        this.drawRandomPerson(model_transform,false,((i/20)%8)+1,"GodHatesWBC","BlackJeans",false);
        model_transform = this.stack.pop();
    }
    
    for(var i = 0; i < 360; i+=20) {
        this.stack.push(model_transform);
        model_transform = mult(model_transform,rotate(i+30,0,1,0));
        model_transform = mult(model_transform,translate(0,0,45));
        model_transform = mult(model_transform,rotate(180,0,1,0));
        this.drawRandomPerson(model_transform,false,((i/20)%8)+1,"GodHatesWBC","BlackJeans",false);
        model_transform = this.stack.pop();
    }
    
    if (this.current_time <= (start_time + 8)) {
        this.camera_transform = lookAt(vec3(0,0,0), vec3(-Math.sin(this.animation_time * .0002) * 100, 0, -Math.cos(this.animation_time * .0002) * 100), vec3(0,1,0));
    }
    
    else if (this.current_time <= (start_time + 14)){
        this.drawChristianEvangelicalPerson(this.vec_prev);
        this.camera_transform = lookAt(vec3(Math.sin(this.animation_time * .0001) * 100, 30, Math.cos(this.animation_time * .0001) * 100), vec3(0,0,0), vec3(0,1,0) );
    }
    
    // Delay 1 s
    else if (this.current_time <= (start_time + 15)){
        this.drawChristianEvangelicalPerson(this.vec_prev);
        this.camera_transform = lookAt(vec3(4.7,4,0), vec3(0,4,0), vec3(0,1,0));
    }
    
    else if(this.current_time <= (start_time + 19)){
        this.drawChristianEvangelicalPerson(this.vec_prev,false,true);
        this.camera_transform = lookAt(vec3(4.7,4,0), vec3(0,4,0), vec3(0,1,0));
        sound.play();
    }
    
    else if(this.current_time <= (start_time + 21)){
        this.camera_transform = lookAt(vec3(0,0,0),vec3(-10,0,-10),vec3(0,1,0));
    }
    
    // Reverse view and delay 2 s
    else {
        this.camera_transform = lookAt(vec3(0,0,0),vec3(10,0,10),vec3(0,1,0));
    }
    
    // Runtime: 23 s
}


Animation.prototype.drawFinalScene = function (model_transform,start_time) {
    
    // The inevitable is coming as the mob approaches the church representative to mug him
    
    if(animate)
        this.relative_time_final += this.animation_delta_time;
    
    for(var i = 0; i < 360; i+=20) {
        this.stack.push(model_transform);
        model_transform = mult(model_transform,rotate(i,0,1,0));
        model_transform = mult(model_transform,translate(0,0,30));
        model_transform = mult(model_transform,rotate(180,0,1,0));
        this.drawRandomPerson(model_transform,true,((i/20)%8)+1,"GodHatesWBC","BlackJeans",true,this.relative_time_final);
        model_transform = this.stack.pop();
    }
    
    for(var i = 0; i < 360; i+=20) {
        this.stack.push(model_transform);
        model_transform = mult(model_transform,rotate(i+30,0,1,0));
        model_transform = mult(model_transform,translate(0,0,45));
        model_transform = mult(model_transform,rotate(180,0,1,0));
        this.drawRandomPerson(model_transform,true,((i/20)%8)+1,"GodHatesWBC","BlackJeans",true,this.relative_time_final);
        model_transform = this.stack.pop();
    }
    
    if(this.current_time <= (start_time + 2))
        this.camera_transform = lookAt(vec3(0,0,0),vec3(10,0,10),vec3(0,1,0));
    
    else {
        if(animate) {
            var rot = 20*Math.sin(this.relative_time_final/1000);
            this.vec_prev = mult(this.vec_prev,rotate(rot,0,1,0));
        }
        this.drawChristianEvangelicalPerson(this.vec_prev);
        
        this.camera_transform = lookAt(vec3(Math.sin(this.relative_time_final * .0001) * 100, 30, Math.cos(this.relative_time_final * .0001) * 100), vec3(0,0,0), vec3(0,1,0) );
    }
    
}





/*////////////////////
 Background
 ////////////////////*/


Animation.prototype.drawBackground = function (model_transform) {
    this.stack = [];
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,translate(0,38.75,-100));
        model_transform = mult(model_transform,scale(200,100,0));
        this.m_cube.draw(model_transform,this.camera_transform,this.projection_transform,"NYC.jpeg");
    model_transform = this.stack.pop();
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,rotate(90,0,1,0));
        model_transform = mult(model_transform,translate(0,38.75,-100));
        model_transform = mult(model_transform,scale(200,100,0));
        this.m_cube.draw(model_transform,this.camera_transform,this.projection_transform,"NYC.jpeg");
    model_transform = this.stack.pop();
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,rotate(-90,0,1,0));
        model_transform = mult(model_transform,translate(0,38.75,-100));
        model_transform = mult(model_transform,scale(200,100,0));
        this.m_cube.draw(model_transform,this.camera_transform,this.projection_transform,"NYC.jpeg");
    model_transform = this.stack.pop();
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,rotate(180,0,1,0));
        model_transform = mult(model_transform,translate(0,38.75,-100));
        model_transform = mult(model_transform,scale(200,100,0));
        this.m_cube.draw(model_transform,this.camera_transform,this.projection_transform,"NYC.jpeg");
    model_transform = this.stack.pop();
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,translate(0,-16.2,0));
        model_transform = mult(model_transform,scale(200,10,200));
        this.m_cube.draw(model_transform,this.camera_transform,this.projection_transform,"Sidewalk.jpeg");
    model_transform = this.stack.pop();
    
}






/*////////////////////
 Shoe Code (Used by everyone except Jesus)
 ////////////////////*/

Animation.prototype.drawShoe = function (model_transform) {
    
    model_transform = mult(model_transform,rotate(-90,1,0,0));
    model_transform = mult(model_transform,translate(0,-3.5,1));
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,scale(3/4,3/4,1));
        model_transform = mult(model_transform,rotate(90,0,0,1));
        this.m_sphere.draw(model_transform,this.camera_transform,this.projection_transform,"Leather.jpeg");
    model_transform = this.stack.pop();
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,rotate(90,1,0,0));
        model_transform = mult(model_transform,translate(0,-1,0));
        model_transform = mult(model_transform,scale(0.6,0.6,2));
        model_transform = mult(model_transform,translate(0,0,-0.15));
        this.m_capped_cylinder.draw(model_transform,this.camera_transform,this.projection_transform,"Leather.jpeg");
    model_transform = this.stack.pop();
    
}







/*////////////////////
Jesus Code
////////////////////*/

Animation.prototype.drawHalo = function (model_transform) {
    
    model_transform = mult(model_transform,translate(0,0,-2));
    model_transform = mult(model_transform,scale(2.5,2.5,0.001));
    model_transform = mult(model_transform,translate(0,0.3,0));
    
    this.m_sphere.draw(model_transform,this.camera_transform,this.projection_transform,"Halo.jpeg");
    
}

Animation.prototype.drawJesusHead = function (model_transform) {
    
    model_transform = mult(model_transform,translate(0,4.3,0));
    this.stack.push(model_transform);
        model_transform = mult(model_transform,rotate(-160,1,0,0));
        model_transform = mult(model_transform,rotate(90,0,1,0));
        model_transform = mult(model_transform,scale(1.75,1.75,1.75));
        this.m_sphere.draw(model_transform,this.camera_transform,this.projection_transform,"JesusFace.jpeg");
    model_transform = this.stack.pop();
    
    this.drawHalo(model_transform);
}

Animation.prototype.drawCross = function (model_transform) {
    
    model_transform = mult(model_transform,scale(1,1,0.5));
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,scale(1,4,1));
        this.m_cube.draw(model_transform,this.camera_transform,this.projection_transform,"Red.jpeg");
    model_transform = this.stack.pop();
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,scale(2.5,1,1));
        model_transform = mult(model_transform,translate(0,0.75,0.01));
        this.m_cube.draw(model_transform,this.camera_transform,this.projection_transform,"Red.jpeg");
    model_transform = this.stack.pop();
    
}

Animation.prototype.drawJesusBody = function (model_transform) {
    
    model_transform = mult(model_transform,rotate(90,1,0,0));
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,translate(0,0,-2.2));
        model_transform = mult(model_transform,scale(1,1,0.4));
        this.m_clothing_frustum.draw(model_transform,this.camera_transform,this.projection_transform);
    model_transform = this.stack.pop();
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,rotate(-90,1,0,0));
        model_transform = mult(model_transform,translate(0,-1,2));
        this.drawCross(model_transform);
    model_transform = this.stack.pop();
    
    model_transform = mult(model_transform,translate(0,0,2));
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,scale(2,2,8));
        this.m_cylinder.draw(model_transform,this.camera_transform,this.projection_transform);
    model_transform = this.stack.pop();
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,translate(0,0,5.5));
        model_transform = mult(model_transform,scale(1.6,1.6,3));
        this.m_clothing_frustum.draw(model_transform,this.camera_transform,this.projection_transform);
    model_transform = this.stack.pop();
    
}

Animation.prototype.drawJesusFoot = function (model_transform) {
    
    model_transform = mult(model_transform,rotate(-90,1,0,0));
    model_transform = mult(model_transform,translate(0,-3.5,1));
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,rotate(90,1,0,0));
        model_transform = mult(model_transform,translate(0,-1,0));
        model_transform = mult(model_transform,scale(0.6,0.6,2));
        model_transform = mult(model_transform,translate(0,0,-0.15));
        this.m_capped_cylinder.draw(model_transform,this.camera_transform,this.projection_transform,"WBCSkin.png");
    model_transform = this.stack.pop();
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,translate(0,-1,-0.3));
        model_transform = mult(model_transform,scale(1.5,3/4,2.5));
        this.m_cube.draw(model_transform,this.camera_transform,this.projection_transform,"WBCSkin.png");
    model_transform = this.stack.pop();
    
    
}

Animation.prototype.drawJesusRightLeg = function (model_transform) {
    
    model_transform = mult(model_transform,rotate(90,1,0,0));
    model_transform = mult(model_transform,translate(-1,0,6.49));
    
    this.drawJesusFoot(model_transform);
}

Animation.prototype.drawJesusLeftLeg = function (model_transform) {
    
    model_transform = mult(model_transform,rotate(90,1,0,0));
    model_transform = mult(model_transform,translate(1,0,6.49));
    
    this.drawJesusFoot(model_transform);
}

Animation.prototype.drawJesusLegs = function (model_transform) {
    this.drawJesusLeftLeg(model_transform);
    this.drawJesusRightLeg(model_transform);
}

Animation.prototype.drawJesusLeftArm = function (model_transform) {
    
    model_transform = mult(model_transform,rotate(90,1,0,0));
    model_transform = mult(model_transform,translate(2,0,-1.5));
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,translate(0.5,0,2.7));
        model_transform = mult(model_transform,scale(0.5,0.5,5.5));
        this.m_cylinder.draw(model_transform,this.camera_transform,this.projection_transform);
    model_transform = this.stack.pop();
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,translate(0.5,0,5.9));
        model_transform = mult(model_transform,scale(0.5,0.5,0.5));
        this.m_sphere.draw(model_transform,this.camera_transform,this.projection_transform,"WBCSkin.png");
    model_transform = this.stack.pop();
    
}

Animation.prototype.drawWaggingFingerHand = function (model_transform,wag_finger) {
    
    this.m_sphere.draw(model_transform,this.camera_transform,this.projection_transform,"WBCSkin.png");
    
    if(wag_finger) {
        model_transform = mult(model_transform,rotate(20*Math.sin(this.animation_time/100),0,0,1));
    }
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,scale(0.3,0.5,0.3));
        model_transform = mult(model_transform,translate(0,2.5,0));
        this.m_cube.draw(model_transform,this.camera_transform,this.projection_transform,"WBCSkin.png");
        model_transform = mult(model_transform,translate(0,1,0));
        this.m_cube.draw(model_transform,this.camera_transform,this.projection_transform,"WBCSkin.png");
        model_transform = mult(model_transform,translate(0,1,0));
        this.m_cube.draw(model_transform,this.camera_transform,this.projection_transform,"WBCSkin.png");
    model_transform = this.stack.pop();
    
}

Animation.prototype.drawJesusRightArm = function (model_transform,tap_back,prepare_to_scold,wag_finger) {
    
    model_transform = mult(model_transform,translate(0,-0.75,0));
    model_transform = mult(model_transform,rotate(45,1,0,0));
    model_transform = mult(model_transform,translate(-3,1.1,-1.3));
    
    model_transform = mult(model_transform,translate(0.5,0,1.25));
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,scale(0.5,0.5,2.5));
        this.m_cylinder.draw(model_transform,this.camera_transform,this.projection_transform);
    model_transform = this.stack.pop();
    
    model_transform = mult(model_transform,translate(0,0,1.25));
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,scale(0.45,0.45,0.45));
        this.m_sphere.draw(model_transform,this.camera_transform,this.projection_transform);
    model_transform = this.stack.pop();
    
    model_transform = mult(model_transform,rotate(-45,1,0,0)); // Undo first rotation
    
    if(tap_back) {
        model_transform = mult(model_transform,rotate(-80 + 40*Math.abs(Math.sin(this.animation_time/500)),1,0,0));
    }
    else {
        model_transform = mult(model_transform,rotate(-80,1,0,0));
    }
    
    model_transform = mult(model_transform,translate(0,0,1.5));
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,scale(0.5,0.5,3));
        this.m_cylinder.draw(model_transform,this.camera_transform,this.projection_transform);
    model_transform = this.stack.pop();
    
    model_transform = mult(model_transform,translate(0,0,2));
    model_transform = mult(model_transform,scale(0.6,0.6,0.6));
    model_transform = mult(model_transform,rotate(80,1,0,0)); // Undo second rotation

    var rot = this.prev_finger_base_location + prepare_to_scold;
    this.prev_finger_base_location = rot;
    model_transform = mult(model_transform,rotate(rot,1,0,0));
    
    this.drawWaggingFingerHand(model_transform,wag_finger);
    
}

Animation.prototype.drawJesusArms = function (model_transform,tap_back,prepare_to_scold,wag_finger) {
    
    this.drawJesusLeftArm(model_transform);
    this.drawJesusRightArm(model_transform,tap_back,prepare_to_scold,wag_finger);
    
}

Animation.prototype.drawJesus = function (model_transform,tap_back,prepare_to_scold,wag_finger) {
    
    model_transform = mult(model_transform,translate(0,0.5,0));
    
    this.drawJesusBody(model_transform);
    this.drawJesusHead(model_transform);
    this.drawJesusArms(model_transform,tap_back,prepare_to_scold,wag_finger);
    this.drawJesusLegs(model_transform);
    
}









/*////////////////////
WBC Person Code
////////////////////*/


Animation.prototype.drawChristianEvangelicalPersonRightLeg = function (model_transform) {
    
    model_transform = mult(model_transform,rotate(90,1,0,0));
    model_transform = mult(model_transform,translate(-1,0,2.5));
    
    this.stack.push(model_transform);
        this.m_sphere.draw(model_transform,this.camera_transform,this.projection_transform,"BlueJeans.jpeg");
        model_transform = mult(model_transform,translate(0,0,1.9));
        model_transform = mult(model_transform,scale(1,1,3));
        this.m_cylinder.draw(model_transform,this.camera_transform,this.projection_transform,"BlueJeans.jpeg");
    model_transform = this.stack.pop();
    
    model_transform = mult(model_transform,translate(0,0,3.4));
    
    this.stack.push(model_transform);
    model_transform = mult(model_transform,scale(0.95,0.95,0.95));
    this.m_sphere.draw(model_transform,this.camera_transform,this.projection_transform,"BlueJeans.jpeg");
    model_transform = this.stack.pop();
    
    model_transform = mult(model_transform,translate(0,0,0.95));
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,translate(0,0,1));
        model_transform = mult(model_transform,scale(1,1,3));
        this.m_cylinder.draw(model_transform,this.camera_transform,this.projection_transform,"BlueJeans.jpeg");
    model_transform = this.stack.pop();
    
    this.drawShoe(model_transform);
    
}

Animation.prototype.drawChristianEvangelicalPersonLeftLeg = function (model_transform) {
    
    model_transform = mult(model_transform,rotate(90,1,0,0));
    model_transform = mult(model_transform,translate(1,0,2.5));
    
    this.stack.push(model_transform);
        this.m_sphere.draw(model_transform,this.camera_transform,this.projection_transform,"BlueJeans.jpeg");
        model_transform = mult(model_transform,translate(0,0,1.9));
        model_transform = mult(model_transform,scale(1,1,3));
        this.m_cylinder.draw(model_transform,this.camera_transform,this.projection_transform,"BlueJeans.jpeg");
    model_transform = this.stack.pop();
    
    model_transform = mult(model_transform,translate(0,0,3.4));
    
    this.stack.push(model_transform);
    model_transform = mult(model_transform,scale(0.95,0.95,0.95));
    this.m_sphere.draw(model_transform,this.camera_transform,this.projection_transform,"BlueJeans.jpeg");
    model_transform = this.stack.pop();
    
    model_transform = mult(model_transform,translate(0,0,0.95));
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,translate(0,0,1));
        model_transform = mult(model_transform,scale(1,1,3));
        this.m_cylinder.draw(model_transform,this.camera_transform,this.projection_transform,"BlueJeans.jpeg");
    model_transform = this.stack.pop();
    
    this.drawShoe(model_transform);
    
}

Animation.prototype.drawHateSign = function (model_transform) {
    model_transform = mult(model_transform,translate(0,5,0));
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,scale(0.5,10,0.5));
        this.m_cube.draw(model_transform,this.camera_transform,this.projection_transform,"wood.jpeg");
    model_transform = this.stack.pop();
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,translate(0,3,0.28));
        model_transform = mult(model_transform,scale(7,8,0.001));
        this.m_cube.draw(model_transform,this.camera_transform,this.projection_transform,"GodHatesFags.jpeg");
    model_transform = this.stack.pop();
}

Animation.prototype.drawChristianEvangelicalPersonRightArm = function (model_transform) {
    
    model_transform = mult(model_transform,rotate(-90,0,1,0));
    model_transform = mult(model_transform,translate(0,1,3.5));
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,scale(0.5,0.5,3));
        this.m_cylinder.draw(model_transform,this.camera_transform,this.projection_transform,"OrangeYellow.jpeg");
    model_transform = this.stack.pop();
    
    model_transform = mult(model_transform,translate(0,0,1.8));
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,scale(0.45,0.45,0.45));
        this.m_sphere.draw(model_transform,this.camera_transform,this.projection_transform,"OrangeYellow.jpeg");
    model_transform = this.stack.pop();
    
    model_transform = mult(model_transform,rotate(90,0,1,0)); // Undo first rotation
    model_transform = mult(model_transform,rotate(-60,1,0,0));
    model_transform = mult(model_transform,translate(0,0,1.2));
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,scale(0.5,0.5,2.5));
        this.m_cylinder.draw(model_transform,this.camera_transform,this.projection_transform,"OrangeYellow.jpeg");
    model_transform = this.stack.pop();
    
    model_transform = mult(model_transform,translate(0,0,1.6));
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,scale(0.5,0.5,0.5));
        this.m_sphere.draw(model_transform,this.camera_transform,this.projection_transform,"WBCSkin.png");
    model_transform = this.stack.pop();
    
    model_transform = mult(model_transform,rotate(60,1,0,0)); // Undo second rotation
    
    this.drawHateSign(model_transform);
}

Animation.prototype.drawMegaphone = function (model_transform) {
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,scale(1,1,4));
        this.m_megaphone_frustum.draw(model_transform,this.camera_transform,this.projection_transform);
    model_transform = this.stack.pop();
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,rotate(90,0,1,0));
        model_transform = mult(model_transform,translate(2,0,0));
        model_transform = mult(model_transform,scale(0.1,0.1,0.1));
        this.m_torus.draw(model_transform,this.camera_transform,this.projection_transform,"Red.jpeg");
    model_transform = this.stack.pop();
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,translate(0,-6/10,-1.5));
        model_transform = mult(model_transform,scale(1/4,1/2,1/4));
        this.m_cube.draw(model_transform,this.camera_transform,this.projection_transform);
        model_transform = mult(model_transform,translate(-5/10,5/10,0.5));
        model_transform = mult(model_transform,scale(1,1/4,1));
        this.m_halfcube.draw(model_transform,this.camera_transform,this.projection_transform);
        model_transform = mult(model_transform,rotate(180,0,1,0));
        model_transform = mult(model_transform,translate(-1,0,0));
        model_transform = mult(model_transform,rotate(-45,1,0,0));
        model_transform = mult(model_transform,translate(0,0,1));
        this.m_halfcube.draw(model_transform,this.camera_transform,this.projection_transform);
    model_transform = this.stack.pop();
    
}

Animation.prototype.drawChristianEvangelicalPersonLeftArm = function (model_transform, bring_megaphone_down) {
    
    // Lower arm animation: *Math.abs(Math.sin(this.animation_time/1000))
    // Unsure of: *Math.abs(Math.sin(this.animation_time/1000)) -- possible upper arm animation?
    
    model_transform = mult(model_transform,rotate(45,1,0,0));
    model_transform = mult(model_transform,translate(2,1.1,-1.3));
    
    model_transform = mult(model_transform,translate(0.5,0,1.25));
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,scale(0.5,0.5,2.5));
        this.m_cylinder.draw(model_transform,this.camera_transform,this.projection_transform,"OrangeYellow.jpeg");
    model_transform = this.stack.pop();
    
    model_transform = mult(model_transform,translate(0,0,1.25));
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,scale(0.45,0.45,0.45));
        this.m_sphere.draw(model_transform,this.camera_transform,this.projection_transform,"OrangeYellow.jpeg");
    model_transform = this.stack.pop();
    
    model_transform = mult(model_transform,rotate(-45,1,0,0)); // Undo first rotation
    model_transform = mult(model_transform,rotate(45,0,0,1));
    
    var rot = 0;
    if(bring_megaphone_down && animate) {
        rot = this.prev_megaphone_arm_rotation + 62/this.framerate;
        this.prev_megaphone_arm_rotation = rot;
    }
    else {
        rot = this.prev_megaphone_arm_rotation;
    }
    model_transform = mult(model_transform,rotate(rot,1,0,0));
    
    model_transform = mult(model_transform,translate(0,0,1.5));
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,scale(0.5,0.5,3));
        this.m_cylinder.draw(model_transform,this.camera_transform,this.projection_transform,"OrangeYellow.jpeg");
    model_transform = this.stack.pop();
    
    model_transform = mult(model_transform,translate(0,0,1.75));
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,scale(0.5,0.5,0.5));
        this.m_sphere.draw(model_transform,this.camera_transform,this.projection_transform,"WBCSkin.png");
    model_transform = this.stack.pop();
    
    model_transform = mult(model_transform,rotate(80,1,0,0)); // Undo third rotation
    model_transform = mult(model_transform,rotate(-45,0,0,1)); // Undo second rotation
    
    model_transform = mult(model_transform,translate(-0.25,1,1.5));
    
    this.drawMegaphone(model_transform);
    
}

Animation.prototype.drawChristianEvangelicalPersonArms = function (model_transform,bring_megaphone_down) {
    this.drawChristianEvangelicalPersonRightArm(model_transform);
    this.drawChristianEvangelicalPersonLeftArm(model_transform,bring_megaphone_down);
}

Animation.prototype.drawChristianEvangelicalPersonLegs = function (model_transform) {
    this.drawChristianEvangelicalPersonLeftLeg(model_transform);
    this.drawChristianEvangelicalPersonRightLeg(model_transform);
}

Animation.prototype.drawChristianEvangelicalPersonBody = function (model_transform) {
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,scale(4,5,2));
        this.m_cube.draw(model_transform,this.camera_transform,this.projection_transform,"OrangeYellow.jpeg");
    model_transform = this.stack.pop();
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,translate(0,0,1.002));
        model_transform = mult(model_transform,scale(4,5,0.01));
        this.m_cube.draw(model_transform,this.camera_transform,this.projection_transform,"DeadSoldiers.png");
    model_transform = this.stack.pop();
}

Animation.prototype.drawTote = function (model_transform) {
    model_transform = mult(model_transform,translate(0,1.4,0));
    model_transform = mult(model_transform,rotate(-90,1,0,0));
    model_transform = mult(model_transform,scale(1.3,1.3,1));
    this.m_capped_cylinder.draw(model_transform,this.camera_transform,this.projection_transform,"CardinalRobes.jpeg");
}

Animation.prototype.drawEyebrows = function (model_transform,eyebrow_movement) {
    
    model_transform = mult(model_transform,translate(0,0.5,0));
    
    // Right Eyebrow
    this.stack.push(model_transform);
        model_transform = mult(model_transform,translate(-0.6,0,0));
    
        var rot = 0;
        if(eyebrow_movement && animate) {
            rot = this.prev_eyebrow_location_right + 62/this.framerate;
            this.prev_eyebrow_location_right = rot;
        }
        else {
            rot = this.prev_eyebrow_location_right;
        }
        model_transform = mult(model_transform,rotate(rot,0,0,1));
    
        this.stack.push(model_transform);
            model_transform = mult(model_transform,rotate(-20,0,1,0));
            model_transform = mult(model_transform,translate(0,-0.1,-0.2));
            model_transform = mult(model_transform,scale(1,0.2,0.2));
            this.m_cube.draw(model_transform,this.camera_transform,this.projection_transform,"Black.jpeg");
        model_transform = this.stack.pop();
    model_transform = this.stack.pop();
    
    // Left Eyebrow
    this.stack.push(model_transform);
        model_transform = mult(model_transform,translate(0.6,0,0));
    
        var rot = 0;
        if(eyebrow_movement && animate) {
            rot = this.prev_eyebrow_location_left - 62/this.framerate;
            this.prev_eyebrow_location_left = rot;
        }
        else {
            rot = this.prev_eyebrow_location_left;
        }
        model_transform = mult(model_transform,rotate(rot,0,0,1));
    
        this.stack.push(model_transform);
            model_transform = mult(model_transform,rotate(20,0,1,0));
            model_transform = mult(model_transform,translate(0,-0.1,-0.2));
            model_transform = mult(model_transform,scale(1,0.2,0.2));
            this.m_cube.draw(model_transform,this.camera_transform,this.projection_transform,"Black.jpeg");
        model_transform = this.stack.pop();
    model_transform = this.stack.pop();
    
}

Animation.prototype.drawEyesAndEyebrows = function (model_transform,eyebrow_movement,widen_eyes) {
    
    //Eyes Animation: +Math.abs((0.05*Math.sin(this.animation_time/1000)))
    
    model_transform = mult(model_transform,translate(0,0.2,1.5));
    var eye_rad_increase = 0;
    if(widen_eyes && animate) {
        eye_rad_increase = this.eye_scale + 3/this.framerate; // Real time speed problem
        this.eye_scale = eye_rad_increase;
    }
    else {
        eye_rad_increase = this.eye_scale;
    }
    
    // Right Eye
    this.stack.push(model_transform);
        model_transform = mult(model_transform,translate(-0.6,0,0));
        model_transform = mult(model_transform,scale(eye_rad_increase,eye_rad_increase,eye_rad_increase));
    
       // model_transform = mult(model_transform,scale(0.2,0.2,0.2));
        model_transform = mult(model_transform,translate(0,0,-1));
        this.m_sphere.draw(model_transform,this.camera_transform,this.projection_transform,"Black.jpeg");
    model_transform = this.stack.pop();
   
    // Left Eye
    this.stack.push(model_transform);
        model_transform = mult(model_transform,translate(0.6,0,0));
        model_transform = mult(model_transform,scale(eye_rad_increase,eye_rad_increase,eye_rad_increase));
    
        //model_transform = mult(model_transform,scale(0.2,0.2,0.2));
        model_transform = mult(model_transform,translate(0,0,-1));
        this.m_sphere.draw(model_transform,this.camera_transform,this.projection_transform,"Black.jpeg");
    model_transform = this.stack.pop();
    
    this.drawEyebrows(model_transform,eyebrow_movement);
}

Animation.prototype.drawMouth = function (model_transform,mouth_movement) {
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,translate(0,-1,1.5));
        model_transform = mult(model_transform,rotate(40,1,0,0));
        model_transform = mult(model_transform,translate(0,0,-0.35));
        model_transform = mult(model_transform,scale(0.1,0.1,0.1));
        model_transform = mult(model_transform,rotate(90,0,1,0));
        if(mouth_movement) {
            model_transform = mult(model_transform,scale(1,Math.sin(this.animation_time/500),1));
        }
        else {
            model_transform = mult(model_transform,scale(1,1/2,1));
        }
        this.m_torus.draw(model_transform,this.camera_transform,this.projection_transform,"Lips.jpeg");
    model_transform = this.stack.pop();
    
}

Animation.prototype.drawNose = function (model_transform) {
    
    model_transform = mult(model_transform,translate(-0.1,-0.3,1.9));
    model_transform = mult(model_transform,scale(0.2,0.5,0.5));
    this.m_halfcube.draw(model_transform,this.camera_transform,this.projection_transform,"WBCSkin.png");
    
}

Animation.prototype.drawFacialFeatures = function (model_transform,mouth_movement,eyebrow_movement,widen_eyes) {
    
    this.drawNose(model_transform);
    this.drawMouth(model_transform,mouth_movement);
    this.drawEyesAndEyebrows(model_transform,eyebrow_movement,widen_eyes);
    this.drawTote(model_transform);
    
}

Animation.prototype.drawChristianEvangelicalPersonHead = function (model_transform,mouth_movement,eyebrow_movement,widen_eyes) {
    
    model_transform = mult(model_transform,translate(0,4,0));
    this.stack.push(model_transform);
        model_transform = mult(model_transform,scale(3/2,3/2,3/2));
        this.m_sphere.draw(model_transform,this.camera_transform,this.projection_transform,"WBCSkin.png");
    model_transform = this.stack.pop();
    this.drawFacialFeatures(model_transform,mouth_movement,eyebrow_movement,widen_eyes);
    
}

Animation.prototype.drawChristianEvangelicalPerson = function (model_transform,bring_megaphone_down,mouth_movement,eyebrow_movement,widen_eyes) {
    
    this.drawChristianEvangelicalPersonBody(model_transform);
    this.drawChristianEvangelicalPersonHead(model_transform,mouth_movement,eyebrow_movement,widen_eyes);
    this.drawChristianEvangelicalPersonArms(model_transform,bring_megaphone_down);
    this.drawChristianEvangelicalPersonLegs(model_transform);
    
}










/*////////////////////
 Regular Person Code
 ////////////////////*/

Animation.prototype.drawPersonHead = function (model_transform,flag,face_texture) {
    
    model_transform = mult(model_transform,translate(0,4,0));
    this.stack.push(model_transform);
        model_transform = mult(model_transform,rotate(-180,1,0,0));
        model_transform = mult(model_transform,rotate(90,0,1,0));
        if(flag) {
            model_transform = mult(model_transform,rotate(10*Math.sin(this.animation_time/1000),0,1,0));
        }
        model_transform = mult(model_transform,scale(1.5,1.5,1.5));
        this.m_sphere.draw(model_transform,this.camera_transform,this.projection_transform,"RandomFace" + face_texture + ".jpeg");
    model_transform = this.stack.pop();
    
}

Animation.prototype.drawPersonRightArm = function (model_transform,flag,sweater_texture,skin_texture) {
    
    model_transform = mult(model_transform,rotate(90,1,0,0));
    model_transform = mult(model_transform,translate(-2,0,-2.3));
    
    if(flag) {
        model_transform = mult(model_transform,rotate(20*Math.sin(this.animation_time/500),1,0,0));
    }
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,translate(-0.5,0,2.7));
        model_transform = mult(model_transform,scale(0.5,0.5,5.5));
        this.m_cylinder.draw(model_transform,this.camera_transform,this.projection_transform,sweater_texture + ".jpeg");
    model_transform = this.stack.pop();
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,translate(-0.5,0,5.9));
        model_transform = mult(model_transform,scale(0.5,0.5,0.5));
        this.m_sphere.draw(model_transform,this.camera_transform,this.projection_transform,"Skin" + skin_texture + ".jpeg");
    model_transform = this.stack.pop();
}

Animation.prototype.drawPersonLeftArm = function (model_transform,flag,sweater_texture,skin_texture) {
    model_transform = mult(model_transform,rotate(90,1,0,0));
    model_transform = mult(model_transform,translate(2,0,-2.3));
    
    if(flag) {
        model_transform = mult(model_transform,rotate(-20*Math.sin(this.animation_time/500),1,0,0));
    }
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,translate(0.5,0,2.7));
        model_transform = mult(model_transform,scale(0.5,0.5,5.5));
        this.m_cylinder.draw(model_transform,this.camera_transform,this.projection_transform,sweater_texture + ".jpeg");
    model_transform = this.stack.pop();
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,translate(0.5,0,5.9));
        model_transform = mult(model_transform,scale(0.5,0.5,0.5));
        this.m_sphere.draw(model_transform,this.camera_transform,this.projection_transform,"Skin" + skin_texture + ".jpeg");
    model_transform = this.stack.pop();
}

Animation.prototype.drawRightLeg = function (model_transform,flag,jeans_texture) {
    
    model_transform = mult(model_transform,rotate(90,1,0,0));
    model_transform = mult(model_transform,translate(-1,0,2.5));
    
    if(flag) {
        model_transform = mult(model_transform,rotate(-20*Math.sin(this.animation_time/500),1,0,0));
    }
    
    this.stack.push(model_transform);
        this.m_sphere.draw(model_transform,this.camera_transform,this.projection_transform,jeans_texture + ".jpeg");
        model_transform = mult(model_transform,translate(0,0,1.9));
        model_transform = mult(model_transform,scale(1,1,3));
        this.m_cylinder.draw(model_transform,this.camera_transform,this.projection_transform,jeans_texture + ".jpeg");
    model_transform = this.stack.pop();
    
    model_transform = mult(model_transform,translate(0,0,3.4));

    this.stack.push(model_transform);
        model_transform = mult(model_transform,scale(0.95,0.95,0.95));
        this.m_sphere.draw(model_transform,this.camera_transform,this.projection_transform,jeans_texture + ".jpeg");
    model_transform = this.stack.pop();
    
    model_transform = mult(model_transform,translate(0,0,0.95));
    
    if(flag)
        model_transform = mult(model_transform,rotate(20*Math.abs(Math.sin(this.animation_time/1000)),1,0,0));
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,translate(0,0,1));
        model_transform = mult(model_transform,scale(1,1,3));
        this.m_cylinder.draw(model_transform,this.camera_transform,this.projection_transform,jeans_texture + ".jpeg");
    model_transform = this.stack.pop();
    
    this.drawShoe(model_transform);
    
    
}

Animation.prototype.drawLeftLeg = function (model_transform,flag,jeans_texture) {
    
    model_transform = mult(model_transform,rotate(90,1,0,0));
    model_transform = mult(model_transform,translate(1,0,2.5));
    
    if(flag) {
        model_transform = mult(model_transform,rotate(20*Math.sin(this.animation_time/500),1,0,0));
    }
    
    this.stack.push(model_transform);
        this.m_sphere.draw(model_transform,this.camera_transform,this.projection_transform,jeans_texture + ".jpeg");
        model_transform = mult(model_transform,translate(0,0,1.9));
        model_transform = mult(model_transform,scale(1,1,3));
        this.m_cylinder.draw(model_transform,this.camera_transform,this.projection_transform,jeans_texture + ".jpeg");
    model_transform = this.stack.pop();
    
    model_transform = mult(model_transform,translate(0,0,3.4));
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,scale(0.95,0.95,0.95));
        this.m_sphere.draw(model_transform,this.camera_transform,this.projection_transform,jeans_texture + ".jpeg");
    model_transform = this.stack.pop();
    
    model_transform = mult(model_transform,translate(0,0,0.95));
    
    if(flag)
        model_transform = mult(model_transform,rotate(20*Math.abs(Math.sin(this.animation_time/1000 + 90)),1,0,0));
    
    this.stack.push(model_transform);
        model_transform = mult(model_transform,translate(0,0,1));
        model_transform = mult(model_transform,scale(1,1,3));
        this.m_cylinder.draw(model_transform,this.camera_transform,this.projection_transform,jeans_texture + ".jpeg");
    model_transform = this.stack.pop();
    
    this.drawShoe(model_transform);
    
}

Animation.prototype.drawNormalPersonArms = function (model_transform,in_motion,sweater_texture,skin_texture) {
    
    if(in_motion) {
        if(sweater_texture == "GodHatesWBC") {
            this.drawPersonRightArm(model_transform,true,"Black",skin_texture);
            this.drawPersonLeftArm(model_transform,true,"Black",skin_texture);
        }
        else {
            this.drawPersonRightArm(model_transform,true,sweater_texture,skin_texture);
            this.drawPersonLeftArm(model_transform,true,sweater_texture,skin_texture);
        }
    }
    else {
        if(sweater_texture == "GodHatesWBC") {
            this.drawPersonRightArm(model_transform,false,"Black",skin_texture);
            this.drawPersonLeftArm(model_transform,false,"Black",skin_texture);
        }
        else {
            this.drawPersonRightArm(model_transform,false,sweater_texture,skin_texture);
            this.drawPersonLeftArm(model_transform,false,sweater_texture,skin_texture);
        }
    }
    
}

Animation.prototype.drawLegs = function (model_transform,in_motion,jeans_texture) {
    
    if(in_motion) {
        this.drawRightLeg(model_transform,true,jeans_texture);
        this.drawLeftLeg(model_transform,true,jeans_texture);
    }
    
    else {
        this.drawRightLeg(model_transform,false,jeans_texture);
        this.drawLeftLeg(model_transform,false,jeans_texture);
    }
    
}

Animation.prototype.drawLegBottom = function (model_transform) {
    
    model_transform = mult(model_transform,translate(0,2,0));
    model_transform = mult(model_transform,translate(0,-2,0));
    this.m_cylinder.draw(model_transform,this.camera_transform,this.projection_transform);
    
}

Animation.prototype.drawLeg = function (model_transform) {
    
    this.drawLegTop(model_transform);
    model_transform = mult(model_transform,translate(0,-2,0));
    this.drawLegBottom(model_transform);
    model_transform = mult(model_transform,translate(0,-2,0));
    
}

Animation.prototype.drawPersonBody = function (model_transform,sweater_texture) {
    
    model_transform = mult(model_transform,scale(4,5,2));
    
    if(sweater_texture == "GodHatesWBC") {
        this.stack.push(model_transform);
            model_transform = mult(model_transform,scale(1/4,1/5,1/2));
            model_transform = mult(model_transform,translate(0,0,1.002));
            model_transform = mult(model_transform,scale(4,5,0.001));
        this.m_cube.draw(model_transform,this.camera_transform,this.projection_transform,"GodHatesWBC.jpeg");
        model_transform = this.stack.pop();
        this.m_cube.draw(model_transform,this.camera_transform,this.projection_transform,"Black.jpeg");
    }
    else {
        this.m_cube.draw(model_transform,this.camera_transform,this.projection_transform,sweater_texture + ".jpeg");
    }
    
}


Animation.prototype.drawRandomPerson = function (model_transform,flag,face_texture,sweater_texture,jeans_texture,move_forward,move_forward_time) {
    
    if(move_forward) {
        model_transform = mult(model_transform,translate(0,0,(move_forward_time/500)));
    }
    
    this.drawPersonBody(model_transform,sweater_texture);
    this.drawPersonHead(model_transform,flag,face_texture);
    this.drawNormalPersonArms(model_transform,flag,sweater_texture,face_texture);
    this.drawLegs(model_transform,flag,jeans_texture);
    
}

Animation.prototype.update_strings = function( debug_screen_object )		// Strings this particular class contributes to the UI
{
    debug_screen_object.string_map["framerate"] = "Framerate " + Math.floor(this.framerate) + "fps";
}