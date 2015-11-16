Westboro Baptist Church Takes New York City
An Original Animated Short (Very short short)
By: Arjun Lakshmipathy


My aim with this project was to paint a possible scenario of what could happen if a member of the Westboro Baptish Church (hereby referred to as WBC) decided to start preaching in the middle of New York City. Please enjoy!


Animation Sequence:

The animation is split up into 5 scenes plus an additional “half-scene” between scenes 2 and three. Each screen is described below:

Scene 1: 
The WBC member stands in the middle of a crowd of New Yorkers whoa are going around their business. Naturally, he desires to preach that God will smite everyone some day, hates fags, blesses the world by killing soldiers, and other various things that often want to make a typical individual throw a grenade at the bigoted preacher. The camera pans around the busy scene as the WBC member pivots back and forth. All other random New Yorkers were drawn in a somewhat random manner - I did my absolute best to try and avoid collisions as much as I could, but in the end decided to let them be since people typically do run into one another a lot in a busy city (though perhaps not through each other…). 

Scene 2: 
The WBC member continues to preach the beliefs of the Church when his activity is suddenly interrupted by an unknown individual gently tapping/poking him on the back. Alarmed by this event, the member proceeds to lower his megaphone and turn around to see who the individual is. The scene ends with him raising his eyebrows in amazement (or disbelief, if you would prefer to think of it that way).

Scene 2.5: 
In this intermediate scene, the camera starts from the bottom and slowly moves up to reveal the individual to be none other than………the supposed lord and savior Jesus Christ!

Scene 3:
Jesus, firmly annoyed by the WBC member’s actions, proceeds to raise his finger and subsequently issue an extremely stern finger wagging to tell off the bigoted WBC member. After properly scolding the latter with the finger wagging, Jesus turns and points to something the WBC member may be interested in. Unfortunately, this turns out to be extremely bad news for the preacher, who’s eyes widen suddenly when he finds out that he might be screwed.

Scene 4: 
The camera pans around to show that somehow, during all this time, the WBC person was slowly being surrounded by 36 New Yorkers who have a bit of a bone to pick with members of the Westboro Baptish Church. Every one of them appears to despise the WBC representative and is dead serious about it. The wide-eyed WBC member then proceeds to say the words “HO-LY SHIT” (pretend each syllable occurs with an opening of the mouth).

Scene 5 (Final):
The short concludes with the 36 New Yorkers closing in on the WBC member. Helpless and panicked, the member rotates around frantically trying to find a way out. I don’t know about you, but I would think anyone would have a hard time powering through 36 well built New Yorkers without suffering some serious damage in the process. Only god would know what happened to the member afterward…………but the outcome is to remain a mystery to the audience as the short abruptly comes to an end.

In each of these scenes, around 20 or so random individuals are drawn in the background. They were carefully randomly generated to not come into contact with the WBC member or Jesus while their animations were taking place. The reason for this was to remind the view that this is very much a busy metropolitan environment and that people will always be walking around.

Additionally, all movement-driven animations are proportionally linked to the frame rate of the animation in order to achieve a sense of real-time animation. One simulated second should roughy correspond to one real second, even if the browser or machine has some lag in rendering the scene. I did have some difficulty rendering so many objects at once - you can see that my frame rate was somewhat questionable. This, however, was considered a reasonable tradeoff in exchange for drawing the number of people I wanted to per scene.

Note that the source code continues the animation during the final scene beyond the end of what was recorded in the movie. Please feel free to manually stop the animation at roughly the same point as the movie - there is no specific “ending scene” so to speak beyond the last scene.



Texture Mapping:

All objects in this short were texture mapped - even the colors. I found that color samples online seemed to match the color sense I was going for more than calling the glut framework to do them - there were simply too many parameters I had to mess with to get the color I wanted using the latter approach. You will find all the textures I used in the same folder as my animation.js file. The megaphone was the only object left uncolored since the default color actually worked for me surprisingly well.



Polygonal Objects:

In addition to the spheres, cubes, and cylinders, already present in the template, I created four additional polygonal objects: a torus, a frustum, a capped cylinder, and a “half-cube”. 

The torus was created by drawing a bunch of cylinders incrementally drawn by rotating the x-axis. It is by default a smooth shaded object since the cylinder object itself was smooth. Examples of torus locations include the mouth of the WBC representative and one of the ends of the megaphone. The gaps in the cylinder draws actually worked surprisingly well for the places I needed to place them.

The frustum was created by increasing the x and y coordinate locations of one part of a cylinder and decreasing the other end. The radii of increase and decrease can be provided to created different varieties of frustums. They are also smooth-shaded by default. Frustums were used to construct much of Jesus’ robes and the megaphone. 

The capped cylinder was created by combining a cylinder with a flattened fan and is by default smooth shaded as well. They were used to make the soles of all the shoes and the hat of the WBC member. 

The half cube was created by painfully mapping out all the individual vertices, indices, normals, and texture coordinates point by point. This was by far the most frustrating to create - it was constructed from individual triangles. This was also my only polygonal object that is flat shaded, and was used to construct parts of the hilt of the megaphone (the part that connects the grip to the actual frustum) and for the nose of the WBC member. 


Final Notes: The short was screen captured with OBS and edited slightly with iMovie. Unfortunately, I was only able to export the movie in medium quality as high quality exceeded the 100 MB file limit. Apologies for the inconvenience. 

 