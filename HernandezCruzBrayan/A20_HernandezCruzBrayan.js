(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.btn_stop = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AheBfIAAi9IC9AAIAAC9g");
	this.shape.setTransform(31.25,31.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AjcDdQhbhcAAiBQAAiABbhcQBbhcCBAAQCBAABcBcQBbBcAACAQAACBhbBcQhcBciBAAQiBAAhbhcg");
	this.shape_1.setTransform(31.25,31.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,62.5,62.5);


(lib.btn_siguiente = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#1D1D1B").ss(2).p("AAABbIAAi1");
	this.shape.setTransform(36.8,29.425);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1D1D1B").s().p("AhOhbICdBbIidBcg");
	this.shape_1.setTransform(29.175,29.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AjMDNQhVhVAAh4QAAh4BVhUQBVhVB3AAQB4AABVBVQBVBUAAB4QAAB4hVBVQhVBVh4AAQh3AAhVhVg");
	this.shape_2.setTransform(29,29);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,58,58);


(lib.btn_play = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AjZj7IGzD7ImzD7g");
	this.shape.setTransform(66.175,57.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AmOGPQimilAAjqQAAjpCmilQCkimDqAAQDqAACmCmQClClAADpQAADqilClQimCmjqAAQjqAAikimg");
	this.shape_1.setTransform(56.5,56.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,113,113);


(lib.btn_pausa = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgbBfIAAi9IA3AAIAAC9g");
	this.shape.setTransform(35.925,31.25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgbBfIAAi9IA3AAIAAC9g");
	this.shape_1.setTransform(25.275,31.25);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AjcDdQhchcAAiBQAAiABchcQBchcCAAAQCBAABcBcQBcBcAACAQAACBhcBcQhcBciBAAQiAAAhchcg");
	this.shape_2.setTransform(31.25,31.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,62.5,62.5);


(lib.btn_home = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(3).p("ACegyIiTBgQgLAGgJgGIiUhg");
	this.shape.setTransform(15.8,5.1359);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.5,-1.5,34.6,13.4);


(lib.btn_cap16 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgnBnQgggeAAgwQAAgdAMgcQAMgcAXgVQAXgVAUgIQAUgIATABIAKAAIAAAGQgXACgNAHQgPAGgNAOQgOAOgIAQQgJARgHAXQAZgQAYAAQAXgBARAUQARARAAAeQAAAdgSAXQgUAcgiAAQgXAAgQgPgAgOgLQgIACgOAJQgDAWAAAOQAAARAGATQAGASALALQAJAIAMAAQAOAAAMgOQALgOAAgZQAAgdgLgVQgMgUgUAAQgHAAgGADg");
	this.shape.setTransform(160.45,29.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgoB1IAAgGQAQgBAFgCQAFgDACgEQABgEAAgVIAAh6QAAgYgBgIQgBgFgDgDQgEgCgEAAQgGAAgLAFIgDgFIA3gbIAFAAIAAC/QAAAUACAEQABAFAFADQAFACAQABIAAAGg");
	this.shape_1.setTransform(143.025,29.35);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("Ag4A2QgSgYAAgcQAAgUALgVQAKgWASgJQARgLASAAQAjAAAWAbQASAWAAAeQAAAUgLAVQgJAVgSALQgRALgVAAQgiAAgVgcgAgWhBQgJAGgGANQgFAOAAAUQAAAhANAZQANAYAWAAQAQAAALgNQAKgOAAghQAAgogSgYQgLgPgSAAQgJAAgJAEg");
	this.shape_2.setTransform(117.25,33.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgjB4IAAgGQAKAAAEgCQAEgDACgFQADgFgBgOIAAiMQABgZgCgGQgBgGgCgCQgDgCgEgBQgFAAgGADIgDgGIAsgSIAIAAIAADLQAAAOACAFQADAFAEACQAEACAMABIAAAGg");
	this.shape_3.setTransform(104.05,29.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AAgBPIAAggQgUAVgKAGQgKAFgLAAQgNAAgJgHQgKgIgEgLQgDgMAAgWIAAhDQgBgLgCgFQgCgEgFgCQgEgCgMAAIAAgGIA1AAIAABmQABAVAHAHQAIAHAKAAQAGAAAKgFQAIgEANgNIAAhWQAAgOgEgEQgGgFgPAAIAAgGIA1AAIAABcQAAAbABAGQACAGACACQADACADAAQAGAAAHgCIABAFIgtATg");
	this.shape_4.setTransform(90.45,33.525);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgHBkQgHgFgDgIQgEgIAAgQIAAhoIgYAAIAAgFQAJgDAKgKQAJgIAIgMQAEgGAGgSIAFAAIAAAzIAkAAIAAALIgkAAIAABjQAAAPAEAGQAEAFAHAAQAGAAAFgDQAFgEADgGIAGAAQgFAQgLAIQgLAIgLAAQgIAAgHgDg");
	this.shape_5.setTransform(77.275,30.9);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgjB4IAAgGQALAAAEgCQAEgDACgFQACgFAAgOIAAg8QAAgZgBgGQgBgFgDgCQgCgDgFAAQgFAAgGADIgDgHIAugSIAHAAIAAB7QAAAOACAFQACAFAFACQAEACALABIAAAGgAgKhaQgFgFAAgGQAAgIAFgEQAFgGAGABQAHgBAFAGQAFAEAAAIQAAAGgFAFQgFAGgHAAQgGAAgFgGg");
	this.shape_6.setTransform(67.625,29.05);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhQB0IAAgGIAEAAQAKAAAGgDQADgCACgFQACgDAAgRIAAiRQAAgPgCgEQgBgEgDgCQgDgCgFAAIgKACIgCgGIAvgTIAHAAIAAAkQAMgUAMgIQALgIANAAQAXAAAQASQATAWAAAkQAAAngXAaQgTAVgdAAQgLAAgJgDQgHgDgIgHIAAAvQAAAQACADQACAFAEADQAFACAMAAIAAAGgAgFhXQgGADgOAPIAAA6QAAARABAGQADALAJAGQAJAIANAAQARAAAKgNQAOgRAAgfQAAgigQgUQgKgMgPAAQgIAAgHADg");
	this.shape_7.setTransform(53.475,36.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AAVBLQgFgGAAgNQgXASgGADQgJAEgKAAQgQAAgLgLQgKgLAAgSQAAgLAFgIQAHgMARgKQARgJAngOIAAgGQAAgXgHgJQgIgJgNAAQgKAAgHAGQgGAGAAAHIAAAKQAAAIgEAEQgEAEgGAAQgGAAgEgEQgEgFAAgHQAAgPAPgMQAPgMAaAAQAUAAANAHQAKAFAFALQADAIAAAWIAAAzIAAAbQABAFACACQABAAAAABQABAAAAAAQABABABAAQAAAAABAAQAAAAABAAQABAAAAgBQABAAAAAAQABAAAAgBQAEgCAKgKIAAAKQgTAZgRAAQgIAAgFgGgAgQAAQgNAIgGAIQgGAIAAAJQAAAMAIAJQAHAHAJAAQANAAAUgQIAAg6QgZAKgHADg");
	this.shape_8.setTransform(38.425,33.225);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AhPBNQgXgfAAgqQAAghAQgdQAPgdAbgPQAagQAfAAQAZAAAYAMQAHAEADAAQAFAAADgDQAEgFACgIIAGAAIAFBNIgFAAQgKgigUgQQgTgPgbAAQgWAAgSAMQgSALgLAZQgKAaAAAkQAAAfAJAXQAKAWAUANQAUAMAZAAQAWAAARgKQARgJAUgdIAGAEQgSAegWAOQgXAOggAAQg3AAgggqg");
	this.shape_9.setTransform(18.725,29.575);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AsTE1QgyAAgjgjQgkgjAAgyIAAl5QAAgyAkgjQAjgjAyAAIYnAAQAyAAAjAjQAjAjAAAyIAAF5QAAAygjAjQgjAjgyAAg");
	this.shape_10.setTransform(90.85,30.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,181.7,61.8);


(lib.btn_cap3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Ag3BxQgJgGAAgHQAAgEAEgEQAEgEAGABIAIABIANAGIAOAGQAGACAHAAQARAAAMgNQANgOAAgSQAAgNgGgMQgEgKgFgFQgIgHgMgFQgMgFgNgBIgFAAIAAgEQANgBAMgJQAOgHAGgMQAGgLAAgMQAAgSgLgLQgLgKgPgBQgaAAgSAcIgFgCQAKgXAOgNQAPgMAVAAQAcgBAPATQALANAAAPQAAAZggAbQAVAIALAOQALAPAAAVQAAAdgTAXQgYAbguAAQgXAAgIgFg");
	this.shape.setTransform(153.225,29.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("Ag4A2QgRgYAAgcQgBgUALgVQALgWARgJQARgLASAAQAjAAAVAbQASAWAAAeQABAUgKAVQgKAVgSALQgSALgTAAQgjAAgVgcgAgWhBQgJAGgFANQgGAOAAAUQAAAhAOAZQANAYAUAAQARAAAKgNQALgOAAghQAAgogRgYQgNgPgRAAQgJAAgJAEg");
	this.shape_1.setTransform(128.1,33.3);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AgkB4IAAgGQALAAAEgCQAEgDACgFQADgFAAgOIAAiMQAAgZgCgGQgBgGgDgCQgCgCgFgBQgDAAgIADIgCgGIAtgSIAIAAIAADLQAAAOABAFQADAFAEACQAEACAMABIAAAGg");
	this.shape_2.setTransform(114.9,29.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AAgBPIAAggQgUAVgKAGQgKAFgLAAQgNAAgKgHQgJgIgEgLQgEgMAAgWIAAhDQAAgLgCgFQgDgEgEgCQgFgCgLAAIAAgGIA2AAIAABmQgBAVAIAHQAHAHALAAQAGAAAJgFQAKgEAMgNIAAhWQAAgOgFgEQgEgFgPAAIAAgGIA0AAIAABcQAAAbABAGQABAGADACQADACADAAQAGAAAGgCIADAFIgvATg");
	this.shape_3.setTransform(101.3,33.525);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgHBkQgHgFgDgIQgEgIAAgQIAAhoIgYAAIAAgFQAJgDAKgKQAJgIAIgMQAEgGAGgSIAFAAIAAAzIAkAAIAAALIgkAAIAABjQAAAPAEAGQAEAFAHAAQAGAAAFgDQAFgEADgGIAGAAQgFAQgLAIQgLAIgLAAQgIAAgHgDg");
	this.shape_4.setTransform(88.125,30.9);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgjB4IAAgGQALAAAEgCQAEgDACgFQACgFAAgOIAAg8QAAgZgBgGQgBgFgDgCQgCgDgFAAQgFAAgGADIgDgHIAugSIAHAAIAAB7QAAAOACAFQACAFAFACQAEACALABIAAAGgAgKhaQgFgFAAgGQAAgIAFgEQAFgGAGABQAHgBAFAGQAFAEAAAIQAAAGgFAFQgFAGgHAAQgGAAgFgGg");
	this.shape_5.setTransform(78.475,29.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AhQB0IAAgGIAEAAQAKAAAGgDQADgCACgFQACgDAAgRIAAiRQAAgPgCgEQgBgEgDgCQgDgCgFAAIgKACIgCgGIAvgTIAHAAIAAAkQAMgUAMgIQALgIANAAQAXAAAQASQATAWAAAkQAAAngXAaQgTAVgdAAQgLAAgJgDQgHgDgIgHIAAAvQAAAQACADQACAFAEADQAFACAMAAIAAAGgAgFhXQgGADgOAPIAAA6QAAARABAGQADALAJAGQAJAIANAAQARAAAKgNQAOgRAAgfQAAgigQgUQgKgMgPAAQgIAAgHADg");
	this.shape_6.setTransform(64.325,36.75);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AAVBLQgFgGAAgNQgXASgGADQgJAEgKAAQgQAAgLgLQgKgLAAgSQAAgLAFgIQAHgMARgKQARgJAngOIAAgGQAAgXgHgJQgIgJgNAAQgKAAgHAGQgGAGAAAHIAAAKQAAAIgEAEQgEAEgGAAQgGAAgEgEQgEgFAAgHQAAgPAPgMQAPgMAaAAQAUAAANAHQAKAFAFALQADAIAAAWIAAAzIAAAbQABAFACACQABAAAAABQABAAAAAAQABABABAAQAAAAABAAQAAAAABAAQABAAAAgBQABAAAAAAQABAAAAgBQAEgCAKgKIAAAKQgTAZgRAAQgIAAgFgGgAgQAAQgNAIgGAIQgGAIAAAJQAAAMAIAJQAHAHAJAAQANAAAUgQIAAg6QgZAKgHADg");
	this.shape_7.setTransform(49.275,33.225);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AhPBNQgXgfAAgqQAAghAQgdQAPgdAbgPQAagQAfAAQAZAAAYAMQAHAEADAAQAFAAADgDQAEgFACgIIAGAAIAFBNIgFAAQgKgigUgQQgTgPgbAAQgWAAgSAMQgSALgLAZQgKAaAAAkQAAAfAJAXQAKAWAUANQAUAMAZAAQAWAAARgKQARgJAUgdIAGAEQgSAegWAOQgXAOggAAQg3AAgggqg");
	this.shape_8.setTransform(29.575,29.575);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AsUE1QgxAAgjgjQgkgjAAgyIAAl5QAAgyAkgjQAjgjAxAAIYpAAQAxAAAjAjQAkAjgBAyIAAF5QABAygkAjQgjAjgxAAg");
	this.shape_9.setTransform(90.85,30.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,181.7,61.8);


(lib.btn_avanzar = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1D1D1B").s().p("AgqgxIBVAxIhVAyg");
	this.shape.setTransform(24.275,18.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1D1D1B").s().p("AgqgxIBVAxIhVAyg");
	this.shape_1.setTransform(15.95,18.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AiHCIQg5g5ABhPQgBhPA5g4QA5g4BOAAQBQAAA4A4QA5A4AABPQAABPg5A5Qg4A5hQgBQhOABg5g5g");
	this.shape_2.setTransform(19.25,19.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,38.5,38.5);


(lib.btn_atrasar = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1D1D1B").s().p("AgqAAIBVgxIAABjg");
	this.shape.setTransform(14.075,18.95);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1D1D1B").s().p("AgqAAIBVgxIAABjg");
	this.shape_1.setTransform(22.4,18.95);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AiHCIQg4g5gBhPQABhPA4g4QA4g4BPAAQBQAAA4A4QA4A4ABBPQgBBPg4A5Qg4A5hQgBQhPABg4g5g");
	this.shape_2.setTransform(19.25,19.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,38.5,38.5);


(lib.btn_anterior = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#1D1D1B").ss(2).p("AAAhaIAAC1");
	this.shape.setTransform(21.6,28.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1D1D1B").s().p("AhOAAICdhaIAAC1g");
	this.shape_1.setTransform(29.225,29);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AjMDNQhVhVAAh4QAAh4BVhUQBUhVB4AAQB4AABVBVQBVBUAAB4QAAB4hVBVQhVBVh4AAQh4AAhUhVg");
	this.shape_2.setTransform(29,29);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,58,58);


(lib.bar_mango = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(10).p("AAyAAQAAAUgOAPQgPAPgVAAQgUAAgPgPQgOgPAAgUQAAgUAOgOQAPgPAUAAQAVAAAPAPQAOAOAAAUg");
	this.shape.setTransform(5,5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgjAjQgOgPAAgUQAAgUAOgPQAPgOAUAAQAVAAAPAOQAOAPAAAUQAAAUgOAPQgPAPgVAAQgUAAgPgPg");
	this.shape_1.setTransform(5,5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bar_mango, new cjs.Rectangle(-5,-5,20,20), null);


(lib.bar_linea = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(10).p("A4LAAMAwXAAA");
	this.shape.setTransform(443.8579,0,1.8759,1);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(148.5,-5,590.8,10);


(lib.bar_fondo = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#B2B2B2").ss(10).p("EgtQAAAMBahAAA");
	this.shape.setTransform(289.725,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5,-5,589.5,10);


(lib.Rectangle = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#706F6F","#565555","#3B3B3B","#252525","#141414","#090909","#020202","#000000"],[0.016,0.067,0.133,0.212,0.298,0.412,0.569,1],0,-640,0,640).s().p("Eg4PBkAMAAAjH/MBwfAAAMAAADH/g");
	this.shape.setTransform(360,640);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Rectangle, new cjs.Rectangle(0,0,720,1280), null);


(lib.Path = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1D1D1B").s().p("Ag7ASIABgnIB2AEIgCAng");
	this.shape.setTransform(422.425,15.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1D1D1B").s().p("AgdAUIAAgoIA7ACIgBAng");
	this.shape_1.setTransform(408.575,15.05);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#1D1D1B").s().p("Ag6AUIgBgnIB3AAIAAAng");
	this.shape_2.setTransform(394.7,15.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#1D1D1B").s().p("Ag7gRIB2gEIABAnIh2AEg");
	this.shape_3.setTransform(377.85,15.375);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#1D1D1B").s().p("AgegRIA7gEIACAnIg7AEg");
	this.shape_4.setTransform(364.025,15.925);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#1D1D1B").s().p("Ag8gPIB2gIIADAnIh1AIg");
	this.shape_5.setTransform(350.175,16.85);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#1D1D1B").s().p("Ag8gNIB1gMIAEAnIh1AMg");
	this.shape_6.setTransform(333.375,18.3);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#1D1D1B").s().p("AgfgPIA6gHIAFAmIg6AHg");
	this.shape_7.setTransform(319.625,19.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#1D1D1B").s().p("Ag8gLIB0gQIAFAnIh0AQg");
	this.shape_8.setTransform(305.9,21.625);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#1D1D1B").s().p("Ag9gJIB1gTIAGAmIh0ATg");
	this.shape_9.setTransform(289.2,24.175);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#1D1D1B").s().p("AgggNIA6gLIAHAmIg5ALg");
	this.shape_10.setTransform(275.575,26.575);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#1D1D1B").s().p("Ag9gHIB0gYIAHAnIhzAYg");
	this.shape_11.setTransform(262,29.275);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#1D1D1B").s().p("Ag+gFQAngKBMgRIAJAmQhLARgnAKg");
	this.shape_12.setTransform(245.5,32.875);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#1D1D1B").s().p("AghgLIA5gPIAKAmIg5APg");
	this.shape_13.setTransform(232.075,36.125);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#1D1D1B").s().p("Ag+gCIBzggIAKAmIhyAfg");
	this.shape_14.setTransform(218.65,39.625);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#1D1D1B").s().p("Ag+gBIBxgiIAMAlIhxAig");
	this.shape_15.setTransform(202.45,44.275);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#1D1D1B").s().p("AghgJIA3gSIANAlIg4ASg");
	this.shape_16.setTransform(189.2,48.3);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#1D1D1B").s().p("Ag9AAIBvglIANAlIhwAmg");
	this.shape_17.setTransform(176.05,52.65);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#1D1D1B").s().p("Ag+ACIBvgoIAOAmIhvAng");
	this.shape_18.setTransform(160.125,58.25);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#1D1D1B").s().p("AgigHIA3gVIAOAkIg3AVg");
	this.shape_19.setTransform(147.15,63.075);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#1D1D1B").s().p("Ag+AEIBugsIAOAlIhsAsg");
	this.shape_20.setTransform(134.25,68.175);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#1D1D1B").s().p("Ag+AFIBtguIAPAlIhrAug");
	this.shape_21.setTransform(118.7,74.675);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#1D1D1B").s().p("AgigFIA1gYIARAjIg1AYg");
	this.shape_22.setTransform(106.05,80.275);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#1D1D1B").s().p("Ag9AHIBqgyIARAlIhqAxg");
	this.shape_23.setTransform(93.475,86.1);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#1D1D1B").s().p("Ag9AJIBpg1IASAkIhpA1g");
	this.shape_24.setTransform(78.35,93.55);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#1D1D1B").s().p("AgjgDIA0gcIASAjIgyAbg");
	this.shape_25.setTransform(66.05,99.9);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#1D1D1B").s().p("Ag9ALIBng4IAUAjQgjARhEAng");
	this.shape_26.setTransform(53.875,106.525);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#1D1D1B").s().p("Ag8ANIBlg7IAUAiIhkA7g");
	this.shape_27.setTransform(39.225,114.925);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#1D1D1B").s().p("AgjAAIAygfIAVAgIgyAgg");
	this.shape_28.setTransform(27.425,122.1);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#1D1D1B").s().p("Ag7ARQAdgUBFguIAVAiQg8AngkAag");
	this.shape_29.setTransform(15.775,129.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(9.8,13,418.7,121.6), null);


(lib.Group_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFD524").s().p("AAAB0IhyA9IAWiAIhdhaICBgTIA4h0IA6B0ICAATIhdBaIAWCAg");
	this.shape.setTransform(666.6,1051.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFD524").s().p("AAAB1IhyA8IAWiAIhdhaICAgSIA5h1IA5B1ICBASIhdBaIAWCAg");
	this.shape_1.setTransform(67.6,1002.7);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFD524").s().p("AAAB0IhyA9IAWiAIhdhZICAgTIA5h1IA6B1ICAATIhdBZIAWCAg");
	this.shape_2.setTransform(534.6,783.7);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFD524").s().p("AAAB0IhyA9IAWiAIhdhZICBgTIA4h1IA6B1ICAATIhdBZIAWCAg");
	this.shape_3.setTransform(18.6,452.7);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFD524").s().p("AAAB0IhyA9IAWiAIhdhZICBgTIA4h1IA5B1ICBATIhdBZIAWCAg");
	this.shape_4.setTransform(178.6,568.7);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFD524").s().p("AAAB1IhyA8IAWiAIhdhaICBgTIA4h0IA5B0ICBATIhdBaIAWCAg");
	this.shape_5.setTransform(673.6,400.7);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFD524").s().p("AAAB0IhyA9IAWiAIhdhZICAgUIA5h0IA6B0ICAAUIhdBZIAWCAg");
	this.shape_6.setTransform(390.6,17.7);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFD524").s().p("AAAB0IhyA9IAWiAIhdhZICAgUIA5h0IA5B0ICBAUIhdBZIAWCAg");
	this.shape_7.setTransform(58.6,71.7);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFD524").s().p("AAAB1IhyA8IAWiAIhdhaICBgTIA4h0IA6B0ICAATIhdBaIAWCAg");
	this.shape_8.setTransform(549.6,184.7);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFD524").s().p("AAAB1IhyA8IAWiAIhdhaICAgSIA5h1IA5B1ICBASIhdBaIAWCAg");
	this.shape_9.setTransform(617.6,624.7);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFD524").s().p("AAAB1IhyA8IAWiAIhdhaICBgTIA4h0IA6B0ICAATIhdBaIAWCAg");
	this.shape_10.setTransform(263.6,421.7);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFD524").s().p("AAAB0IhyA9IAWiAIhdhZICAgTIA5h1IA6B1ICAATIhdBZIAWCAg");
	this.shape_11.setTransform(381.6,659.7);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFD524").s().p("AAAB0IhyA9IAWiAIhdhZICBgUIA4h0IA5B0ICBAUIhdBZIAWCAg");
	this.shape_12.setTransform(89.6,773.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group_1, new cjs.Rectangle(0,0,692.2,1069.4), null);


(lib.AudioTexto = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Capa_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgkAxQgNgOAAgZIAAgTQAAgZANgOQANgOAXAAQAYAAANAOQANAOAAAZIAAATQAAAZgNAOQgNAOgYAAQgXAAgNgOgAgXgkQgJAJAAASIAAATQAAARAJAKQAIAKAPAAQAQAAAJgKQAIgKAAgRIAAgTQAAgSgIgJQgJgKgQAAQgPAAgIAKg");
	this.shape.setTransform(131.625,14.475);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAOBPQgOAAgHgIQgHgJAAgPIAAhLIgMAAIAAgOIAMAAIAAAOIAQAAIAABLQAAAIAEAEQADAEAHAAIALAAIAAAQgAACgcIAAgOIAZAAIAAAOgAACgcgAgOgcIAAgOIAQAAIAAAOgAgOgcgAACgqIgQAAIAAgkIAQAAIAAAkg");
	this.shape_1.setTransform(120.925,12.725);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAkA9IgjgxIADgEIgJgNIgDAEIgtg7IATAAIAjAyIgCADIAIAMIADgEIAtA8gAg2A9IAug+IAEAEIAFAJIgkAxgAgEADIgEgEIADgEIAJANIgDAEgAgBgHIACgDIAEAFIAFAGIgDAEgAAKABIgFgGIgEgFIAhgyIATAAIgrA9gAAKABgAABgKg");
	this.shape_2.setTransform(111.025,14.475);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AgjAwQgOgOAAgaIAAgNQAAgbAOgPQANgPAYAAQAXAAAMAPQANAPAAAaIAAANIhTAAIAAgNIAAgBIgEAAIAAAOIAEAAIAAABQAAATAKAKQAKAKARAAQAIAAAJgEQAIgDAGgHIAMALQgJAJgLAFQgMAFgLAAQgZAAgOgPgAAigHIAAgBQAAgSgIgKQgJgKgPAAQgQAAgKAKQgJAKAAATIBDAAgAghAHgAglAHIAAgOIAEAAIAAABIAAANgAAigHIhDAAQAAgTAJgKQAKgKAQAAQAPAAAJAKQAIAKAAASIAAABgAghgHg");
	this.shape_3.setTransform(98.475,14.475);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#000000").s().p("AgHBVIAAiZIAPAAIAACZgAAIhEIAAgJIgPAAIAAAJIg0AAIAAgQIB3AAIAAAQgAgHhEIAAgJIAPAAIAAAJgAgHhEg");
	this.shape_4.setTransform(86.225,12.025);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("AgIBpIAAjRIAQAAIAADRg");
	this.shape_5.setTransform(70.7,12.025);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AgkAxQgNgOAAgZIAAgTQAAgZANgOQANgOAXAAQAYAAANAOQANAOAAAZIAAATQAAAZgNAOQgNAOgYAAQgXAAgNgOgAgXgkQgJAJAAASIAAATQAAARAJAKQAIAKAPAAQAQAAAJgKQAIgKAAgRIAAgTQAAgSgIgJQgJgKgQAAQgPAAgIAKg");
	this.shape_6.setTransform(54.375,14.475);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AgHBVIAAh4IAPAAIAAB4gAgHhDIAAgRIAPAAIAAARg");
	this.shape_7.setTransform(44.925,12.025);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AgkBJQgLgNAAgXIAAgbQgBgWALgNQALgNATAAQANAAAKAFQAKAEAGAJIAAAaQgBgHgDgGQgEgHgHgFQgHgFgKAAQgNAAgJAKQgJAJABAQIAAAaQgBAQAJAJQAJAJANAAQAKAAAHgEQAHgFAEgHQADgHABgHIAAAbIABgDIgBgYIAAgBIAAghIACgXIgCgEIACAEIgCAXIAAgBIAAgaIAAhBIARAAIAACpIgRAAIAAgQQgFAJgJAEQgKAFgNAAQgUAAgLgNgAgWA+QgJgJABgQIAAgaQgBgQAJgJQAJgKANAAQAKAAAHAFQAHAFAEAHQADAGABAHIAAABIAAAhIAAABQgBAHgDAHQgEAHgHAFQgHAEgKAAQgNAAgJgJgAAgApIABAYIgBADgAAgApgAAgAHg");
	this.shape_8.setTransform(35.25,12.125);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#000000").s().p("AglAxQgLgNABgYIAAhJIAQAAIAABJQAAAQAJAJQAIAJAOAAQAPAAAJgIQAHgIABgOIAAgBIABAZIgBAEIAAgcIAAAcIABgEIgBgZIAAhMIARAAIAAB5IgRAAIAAgQQgFAGgIAFQgJAHgPAAQgVAAgLgNg");
	this.shape_9.setTransform(22.3,14.575);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AA3BVIgPgpIAGAAIAAgQIgMAAIAMAAIAAAQIgGAAIgGgQIgiheIghBeIBDAAIAGAQIhOAAIAFgQIgKAAIAAAQIAFAAIgPApIgTAAIA/ipIAUAAIA+CpgAgmAsIgFAAIAAgQIAKAAIgFAQgAAiAcgAghAcIAhheIAiBeg");
	this.shape_10.setTransform(7.75,12.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.AudioTexto, new cjs.Rectangle(-2,-5.3,142.4,32.8), null);


// stage content:
(lib.A20_HernandezCruzBrayan = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {audio_cap3:1,audio_cap16:2,inicio:0,capitulo3:1,capitulo16:2};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,2];
	this.streamSoundSymbolsList[1] = [{id:"audio_cap3",startFrame:1,endFrame:2,loop:1,offset:0}];
	this.streamSoundSymbolsList[2] = [{id:"audio_cap16",startFrame:2,endFrame:3,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.stop();
		
		var exportRoot = this;
		
		/* =========================
		   VARIABLES
		========================= */
		
		var audioActual = null;
		var tickListener = null;
		var audioPaused = false;
		var arrastrando = false;
		
		var barra_x = 73.9;
		var barra_ancho = 579.41;
		
		/* =========================
		   UTILIDADES
		========================= */
		
		function irA(etiqueta){
		
			console.log("Ir a:", etiqueta);
		
			exportRoot.gotoAndStop(etiqueta);
		}
		
		function activarBtn(nombre, handler){
		
			var btn = exportRoot[nombre];
		
			console.log("Buscando boton:", nombre, btn);
		
			if(!btn){
				console.log("NO EXISTE:", nombre);
				return;
			}
		
			btn.cursor = "pointer";
		
			btn.removeAllEventListeners("click");
		
			btn.on("click", function(evt){
		
				console.log("CLICK:", nombre);
		
				handler(evt);
			});
		}
		
		function fmt(ms){
		
			if(!ms || isNaN(ms) || ms < 0){
				return "0:00";
			}
		
			var s = Math.floor(ms / 1000);
			var m = Math.floor(s / 60);
		
			s = s % 60;
		
			return m + ":" + (s < 10 ? "0" : "") + s;
		}
		
		/* =========================
		   AUDIO
		========================= */
		
		function playAudio(id){
		
			console.log("PLAY:", id);
		
			console.log("loadComplete:",
				createjs.Sound.loadComplete(id)
			);
		
			if(audioActual){
		
				console.log("Deteniendo audio anterior");
		
				audioActual.stop();
			}
		
			audioActual = createjs.Sound.play(id);
		
			console.log("audioActual:", audioActual);
		
			if(!audioActual){
		
				console.log("ERROR: audioActual null");
		
				return;
			}
		
			audioActual.volume = 1;
		
			audioPaused = false;
		
			iniciarTicker();
		}
		
		function pauseAudio(){
		
			console.log("PAUSE");
		
			if(audioActual){
		
				audioActual.paused = true;
		
				audioPaused = true;
		
				console.log("Audio pausado");
			}else{
				console.log("No hay audio");
			}
		}
		
		function resumeAudio(){
		
			console.log("RESUME");
		
			if(audioActual){
		
				audioActual.paused = false;
		
				audioPaused = false;
		
				console.log("Audio reanudado");
			}else{
				console.log("No hay audio");
			}
		}
		
		function stopAudio(){
		
			console.log("STOP");
		
			if(audioActual){
		
				audioActual.stop();
		
				audioActual = null;
		
				console.log("Audio detenido");
			}else{
				console.log("No habia audio");
			}
		
			audioPaused = false;
		
			detenerTicker();
		
			actualizarBarra(0,0);
		}
		
		function avanzarAudio(){
		
			console.log("AVANZAR");
		
			if(audioActual){
		
				audioActual.position = Math.min(
					audioActual.position + 5000,
					audioActual.duration
				);
		
				console.log(
					"Nueva posicion:",
					audioActual.position
				);
		
				actualizarBarra(
					audioActual.position,
					audioActual.duration
				);
		
			}else{
		
				console.log("No hay audio");
			}
		}
		
		function retrocederAudio(){
		
			console.log("RETROCEDER");
		
			if(audioActual){
		
				audioActual.position = Math.max(
					audioActual.position - 5000,
					0
				);
		
				console.log(
					"Nueva posicion:",
					audioActual.position
				);
		
				actualizarBarra(
					audioActual.position,
					audioActual.duration
				);
		
			}else{
		
				console.log("No hay audio");
			}
		}
		
		/* =========================
		   BARRA
		========================= */
		
		function actualizarBarra(pos, dur){
		
			var pct = (dur > 0)
				? Math.min(pos / dur, 1)
				: 0;
		
			console.log(
				"Actualizar barra:",
				"pos =", pos,
				"dur =", dur,
				"pct =", pct
			);
		
			var linea = exportRoot["bar_linea"];
		
			console.log("bar_linea:", linea);
		
			if(linea){
		
				linea.scaleX = pct;
			}
		
			var mango = exportRoot["bar_mango"];
		
			console.log("bar_mango:", mango);
		
			if(mango){
		
				mango.x = barra_x + (pct * barra_ancho);
			}
		
			var lbl = exportRoot["lbl_tiempo"];
		
			console.log("lbl_tiempo:", lbl);
		
			if(lbl){
		
				lbl.text = fmt(pos) + " / " + fmt(dur);
			}
		}
		
		function iniciarTicker(){
		
			console.log("INICIAR TICKER");
		
			detenerTicker();
		
			tickListener = createjs.Ticker.on("tick", function(){
		
				if(audioActual && !audioActual.paused){
		
					actualizarBarra(
						audioActual.position,
						audioActual.duration
					);
				}
			});
		}
		
		function detenerTicker(){
		
			console.log("DETENER TICKER");
		
			if(tickListener !== null){
		
				createjs.Ticker.off("tick", tickListener);
		
				tickListener = null;
			}
		}
		
		/* =========================
		   DRAG BARRA
		========================= */
		
		function xAms(xStage, dur){
		
			var stage = exportRoot.stage || exportRoot.getStage();
		
			var escala = stage ? stage.scaleX : 1;
		
			var xLocal = xStage / escala;
		
			var rel = Math.max(
				0,
				Math.min(xLocal - barra_x, barra_ancho)
			);
		
			var resultado = (rel / barra_ancho) * dur;
		
			console.log(
				"xAms:",
				"xStage =", xStage,
				"resultado =", resultado
			);
		
			return resultado;
		}
		
		function activarBarraDrag(){
		
			console.log("ACTIVAR BARRA DRAG");
		
			var fondo = exportRoot["bar_fondo"];
			var mango = exportRoot["bar_mango"];
		
			var stage = exportRoot.stage || exportRoot.getStage();
		
			console.log("bar_fondo:", fondo);
			console.log("bar_mango:", mango);
			console.log("stage:", stage);
		
			if(fondo){
		
				fondo.cursor = "pointer";
		
				fondo.removeAllEventListeners("click");
		
				fondo.on("click", function(evt){
		
					console.log(
						"CLICK EN BARRA",
						evt.stageX
					);
		
					if(!audioActual){
		
						console.log("No hay audio");
		
						return;
					}
		
					audioActual.position = xAms(
						evt.stageX,
						audioActual.duration
					);
		
					actualizarBarra(
						audioActual.position,
						audioActual.duration
					);
				});
			}
		
			if(mango){
		
				mango.cursor = "ew-resize";
		
				mango.removeAllEventListeners("mousedown");
		
				mango.on("mousedown", function(){
		
					console.log("MOUSEDOWN MANGO");
		
					arrastrando = true;
		
					if(audioActual){
		
						audioActual.paused = true;
					}
				});
			}
		
			if(stage){
		
				stage.removeAllEventListeners("stagemousemove");
				stage.removeAllEventListeners("stagemouseup");
		
				stage.on("stagemousemove", function(evt){
		
					if(!arrastrando || !audioActual){
						return;
					}
		
					console.log(
						"ARRASTRANDO:",
						evt.stageX
					);
		
					var nuevaPos = xAms(
						evt.stageX,
						audioActual.duration
					);
		
					audioActual.position = nuevaPos;
		
					actualizarBarra(
						nuevaPos,
						audioActual.duration
					);
				});
		
				stage.on("stagemouseup", function(){
		
					if(!arrastrando){
						return;
					}
		
					console.log("MOUSEUP");
		
					arrastrando = false;
		
					if(audioActual){
		
						audioActual.paused = false;
					}
				});
			}
		}
		
		/* =========================
		   ESCENAS
		========================= */
		
		function initInicio(){
		
			console.log("INIT INICIO");
		
			stopAudio();
		
			activarBtn("btn_cap3", function(){
		
				irA("capitulo3");
		
				setTimeout(function(){
		
					initCapitulo3();
		
				}, 50);
			});
		
			activarBtn("btn_cap16", function(){
		
				irA("capitulo16");
		
				setTimeout(function(){
		
					initCapitulo16();
		
				}, 50);
			});
		}
		
		function initCapitulo3(){
		
			console.log("INIT CAPITULO 3");
		
			actualizarBarra(0,0);
		
			activarBarraDrag();
		
			activarBtn("btn_home", function(){
		
				stopAudio();
		
				irA("inicio");
		
				setTimeout(function(){
		
					initInicio();
		
				}, 50);
			});
		
			activarBtn("btn_anterior", function(){
		
				console.log("Primer capítulo");
			});
		
			activarBtn("btn_siguiente", function(){
		
				stopAudio();
		
				irA("capitulo16");
		
				setTimeout(function(){
		
					initCapitulo16();
		
				}, 50);
			});
		
			activarBtn("btn_play", function(){
		
				if(audioActual && audioPaused){
		
					resumeAudio();
		
				}else{
		
					playAudio("audio_cap3");
				}
			});
		
			activarBtn("btn_pausa", function(){
		
				pauseAudio();
			});
		
			activarBtn("btn_stop", function(){
		
				stopAudio();
			});
		
			activarBtn("btn_avanzar", function(){
		
				avanzarAudio();
			});
		
			activarBtn("btn_atrasar", function(){
		
				retrocederAudio();
			});
		}
		
		function initCapitulo16(){
		
			console.log("INIT CAPITULO 16");
		
			actualizarBarra(0,0);
		
			activarBarraDrag();
		
			activarBtn("btn_home", function(){
		
				stopAudio();
		
				irA("inicio");
		
				setTimeout(function(){
		
					initInicio();
		
				}, 50);
			});
		
			activarBtn("btn_anterior", function(){
		
				stopAudio();
		
				irA("capitulo3");
		
				setTimeout(function(){
		
					initCapitulo3();
		
				}, 50);
			});
		
			activarBtn("btn_siguiente", function(){
		
				console.log("Último capítulo");
			});
		
			activarBtn("btn_play", function(){
		
				if(audioActual && audioPaused){
		
					resumeAudio();
		
				}else{
		
					playAudio("audio_cap16");
				}
			});
		
			activarBtn("btn_pausa", function(){
		
				pauseAudio();
			});
		
			activarBtn("btn_stop", function(){
		
				stopAudio();
			});
		
			activarBtn("btn_avanzar", function(){
		
				avanzarAudio();
			});
		
			activarBtn("btn_atrasar", function(){
		
				retrocederAudio();
			});
		}
		
		/* =========================
		   START
		========================= */
		
		console.log("SONIDOS:");
		console.log(createjs.Sound._idHash);
		
		initInicio();
	}
	this.frame_1 = function() {
		var soundInstance = playSound("audio_cap3",0);
		this.InsertIntoSoundStreamData(soundInstance,1,2,1);
	}
	this.frame_2 = function() {
		var soundInstance = playSound("audio_cap16",0);
		this.InsertIntoSoundStreamData(soundInstance,2,3,1);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(1));

	// btn_stop
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgbBfIAAi9IA3AAIAAC9g");
	this.shape.setTransform(263.475,1160.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AgbBfIAAi9IA3AAIAAC9g");
	this.shape_1.setTransform(252.825,1160.5);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AjcDdQhchcAAiBQAAiABchcQBchcCAAAQCBAABcBcQBcBcAACAQAACBhcBcQhcBciBAAQiAAAhchcg");
	this.shape_2.setTransform(258.8,1160.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AheBfIAAi9IC9AAIAAC9g");
	this.shape_3.setTransform(468.8,1160.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AjcDdQhbhcAAiBQAAiABbhcQBbhcCBAAQCBAABcBcQBbBcAACAQAACBhbBcQhcBciBAAQiBAAhbhcg");
	this.shape_4.setTransform(468.8,1160.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},2).wait(1));

	// btn_stop
	this.btn_stop = new lib.btn_stop();
	this.btn_stop.name = "btn_stop";
	this.btn_stop.setTransform(468.75,1160.45,1,1,0,0,0,31.2,31.2);
	this.btn_stop._off = true;
	new cjs.ButtonHelper(this.btn_stop, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.btn_stop).wait(1).to({_off:false},0).wait(2));

	// btn_pausa
	this.btn_pausa = new lib.btn_pausa();
	this.btn_pausa.name = "btn_pausa";
	this.btn_pausa.setTransform(258.75,1160.45,1,1,0,0,0,31.2,31.2);
	this.btn_pausa._off = true;
	new cjs.ButtonHelper(this.btn_pausa, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.btn_pausa).wait(1).to({_off:false},0).wait(2));

	// btn_play
	this.btn_play = new lib.btn_play();
	this.btn_play.name = "btn_play";
	this.btn_play.setTransform(362.5,1160.5,1,1,0,0,0,56.5,56.5);
	this.btn_play._off = true;
	new cjs.ButtonHelper(this.btn_play, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.btn_play).wait(1).to({_off:false},0).wait(2));

	// btn_anterior
	this.btn_anterior = new lib.btn_anterior();
	this.btn_anterior.name = "btn_anterior";
	this.btn_anterior.setTransform(179.35,1160.5,1,1,0,0,0,29,29);
	this.btn_anterior._off = true;
	new cjs.ButtonHelper(this.btn_anterior, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.btn_anterior).wait(1).to({_off:false},0).wait(2));

	// btn_avanzar
	this.btn_avanzar = new lib.btn_avanzar();
	this.btn_avanzar.name = "btn_avanzar";
	this.btn_avanzar.setTransform(618.85,1160.45,1,1,0,0,0,19.2,19.2);
	this.btn_avanzar._off = true;
	new cjs.ButtonHelper(this.btn_avanzar, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.btn_avanzar).wait(1).to({_off:false},0).wait(2));

	// btn_retroceder
	this.btn_atrasar = new lib.btn_atrasar();
	this.btn_atrasar.name = "btn_atrasar";
	this.btn_atrasar.setTransform(116.05,1160.45,1,1,0,0,0,19.2,19.2);
	this.btn_atrasar._off = true;
	new cjs.ButtonHelper(this.btn_atrasar, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.btn_atrasar).wait(1).to({_off:false},0).wait(2));

	// btn_siguiente
	this.btn_siguiente = new lib.btn_siguiente();
	this.btn_siguiente.name = "btn_siguiente";
	this.btn_siguiente.setTransform(554.65,1160.5,1,1,0,0,0,29,29);
	this.btn_siguiente._off = true;
	new cjs.ButtonHelper(this.btn_siguiente, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.btn_siguiente).wait(1).to({_off:false},0).wait(2));

	// btn_home
	this.btn_home = new lib.btn_home();
	this.btn_home.name = "btn_home";
	this.btn_home.setTransform(38.7,28.15,1,1,0,0,0,15.8,5.2);
	this.btn_home._off = true;
	new cjs.ButtonHelper(this.btn_home, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.btn_home).wait(1).to({_off:false},0).wait(2));

	// bar_relleno
	this.bar_linea = new lib.bar_linea();
	this.bar_linea.name = "bar_linea";
	this.bar_linea.setTransform(72.75,1023.6,1,1,0,0,0,154.8,0);
	this.bar_linea._off = true;

	this.timeline.addTween(cjs.Tween.get(this.bar_linea).wait(1).to({_off:false},0).wait(2));

	// bar_mango
	this.bar_mango = new lib.bar_mango();
	this.bar_mango.name = "bar_mango";
	this.bar_mango.setTransform(382,1024,1,1,0,0,0,5,5);
	this.bar_mango._off = true;

	this.timeline.addTween(cjs.Tween.get(this.bar_mango).wait(1).to({_off:false},0).wait(2));

	// bar_fondo
	this.bar_fondo = new lib.bar_fondo();
	this.bar_fondo.name = "bar_fondo";
	this.bar_fondo.setTransform(363.6,1023.6,1,1,0,0,0,289.7,0);
	this.bar_fondo._off = true;

	this.timeline.addTween(cjs.Tween.get(this.bar_fondo).wait(1).to({_off:false},0).wait(2));

	// img_avion
	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(3).p("AhwBTIAkhOIgrhIIBUALIA4hAIAQBUIBOAiIhLAoIgIBUIg9g6g");
	this.shape_5.setTransform(570.3281,181.7487);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(3).p("ABug3IgqBAIAeBIIhLgUIg5AyIgFhNIhCgnIBIgcIAShMIAwA8g");
	this.shape_6.setTransform(382.15,167.55,1,1,0,0,0,-0.8,0);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#000000").ss(3).p("AA4AcIgmgEIgYAeIgJglIgkgOIAhgTIACgnIAdAZIAlgKIgPAkg");
	this.shape_7.setTransform(195.85,419.2,1,1,0,0,0,-0.5,0);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(3).p("AAqA6IgngSIgjAVIAFgqIgggbIAqgIIARgnIATAlIArAEIgdAeg");
	this.shape_8.setTransform(537.8397,475.1719);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#000000").ss(3).p("ABug3IgqBAIAeBIIhLgUIg5AyIgFhNIhCgnIBIgcIAShMIAwA8g");
	this.shape_9.setTransform(403.15,582.55,1,1,0,0,0,-0.8,0);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#000000").ss(3).p("AB3g0IgwBDIAdBOIhPgZIhBA0IgBhTIhFguIBPgbIAWhQIAxBDg");
	this.shape_10.setTransform(502.15,286.3,1,1,0,0,0,-0.9,0);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#000000").ss(3).p("ACTBZIhogPIhGBMIgShnIhfgsIBdgwIANhoIBKBJIBngUIgvBeg");
	this.shape_11.setTransform(167.95,169.05,1,1,0,0,0,-0.3,0);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(3).p("As3rUIBDAFQBWAKBcARQEoA5D6B4QFdCoDREOQEFFRAYHg");
	this.shape_12.setTransform(212.9391,533.04);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#1D1D1B").s().p("AgpAQIAJgrQAqAJAgACIgCArQgigBgvgKg");
	this.shape_13.setTransform(558,441.7);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#1D1D1B").s().p("AgqgNIBKgQIALArQgmAJgnAHg");
	this.shape_14.setTransform(572.125,440.8);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#1D1D1B").s().p("AgsgHQArgNAZgOIAVAnQgfAPgtAPg");
	this.shape_15.setTransform(585.725,437);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#1D1D1B").s().p("AgsAAIAYgmQAeATAjATIgVAnQgogWgcgRg");
	this.shape_16.setTransform(518.675,427.7);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#1D1D1B").s().p("AgsAFIATgoQAiAQAkAOIgQApQgigNgngSg");
	this.shape_17.setTransform(531.175,433.85);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#1D1D1B").s().p("AgrAKIAPgqQAtAQAbAGIgMArQgcgHgvgQg");
	this.shape_18.setTransform(544.325,438.575);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#1D1D1B").s().p("AgMAaIgJgTIgHgSIgHgUIAqgNIAHASIAGARQABAGAGAKIAIARIgmAVg");
	this.shape_19.setTransform(489.8,398.175);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#1D1D1B").s().p("AgQAOQgLgNgOgTIAlgaIAVAfIAZAbIghAeQgJgJgQgVg");
	this.shape_20.setTransform(496.925,410.1);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#1D1D1B").s().p("AgsgHIAegiQAYAWAjAYIgaAlQgegVghgcg");
	this.shape_21.setTransform(506.95,419.85);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#1D1D1B").s().p("AgnAZQAZguAVgXIAiAdQgUAUgVAog");
	this.shape_22.setTransform(494.1,357.125);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#1D1D1B").s().p("AgeAkIAThPIAqAOIgKAkIgIAlg");
	this.shape_23.setTransform(488.775,370.075);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#1D1D1B").s().p("AgVAfIgCgfQgBgKADgeIAsADQgCAcAAAJIADAkIgsAGg");
	this.shape_24.setTransform(487.0107,384.2);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#1D1D1B").s().p("AgDASIgIgFQgRgHgQgEIAUgpIAnAPQACAAAGAHIAWAYIgfAhg");
	this.shape_25.setTransform(532.1,349.1);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#1D1D1B").s().p("AgmAVIgDgsQAVgCAUACIAqAEIgIAsQgkgGgkACg");
	this.shape_26.setTransform(518.675,345.5125);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#1D1D1B").s().p("AgtAAQAlgYApgMIAMAqQgjAKgdAVg");
	this.shape_27.setTransform(504.45,347.95);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#1D1D1B").s().p("AgiAaIAEgJIAXg9IAqANQgJAcgEAKIgQAmg");
	this.shape_28.setTransform(539.625,388.275);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#1D1D1B").s().p("AgXAkQAEgggCgpIAsgEQADAqgFApg");
	this.shape_29.setTransform(542.3563,374.475);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#1D1D1B").s().p("AgigWIAmgWQATAjAMArIgrAMQgJgkgRggg");
	this.shape_30.setTransform(540,360.3);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#1D1D1B").s().p("AgrAFQAKgFATgQQAWgTAGgGIAfAiIggAZIgeAYg");
	this.shape_31.setTransform(514.05,421.05);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#1D1D1B").s().p("AgqAMIAzg3IAiAeIg2A5g");
	this.shape_32.setTransform(524.225,411.525);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#1D1D1B").s().p("AgoASIAqg+IAmAXIgsBCg");
	this.shape_33.setTransform(533.05,400.7);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#1D1D1B").s().p("AgogTIAmgBQAMgBAagDIAEAsIgnAEIgoABg");
	this.shape_34.setTransform(475.15,435.4);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#1D1D1B").s().p("AgqgMIAlgIIAjgKIANAqIgnALQgZAHgNABg");
	this.shape_35.setTransform(488.975,433.35);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#1D1D1B").s().p("AgsgDIBDghIAWAmIhIAkg");
	this.shape_36.setTransform(502.15,428.6);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#1D1D1B").s().p("AgrAKIAOgqQAwAQAZAHIgMAqIhLgXg");
	this.shape_37.setTransform(433.575,429.6);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#1D1D1B").s().p("AgqANIALgqIAkAIIAmAHIgIAsg");
	this.shape_38.setTransform(447.05,433.1);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#1D1D1B").s().p("AgoATIAGgsQAZAEAyADIgDAsQg8gEgSgDg");
	this.shape_39.setTransform(460.875,435.15);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#1D1D1B").s().p("AgsAAIAXgmQAnAYAbAOIgVAnQglgUgfgTg");
	this.shape_40.setTransform(395.2,412.825);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#1D1D1B").s().p("AgsADIAVgnIBEAhIgTAog");
	this.shape_41.setTransform(407.525,419.275);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#1D1D1B").s().p("AgsAGIASgoQAoAQAeAMIgPAqg");
	this.shape_42.setTransform(420.3,424.9);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#000000").p("ASDDFMgjYgKYIftO1");
	this.shape_43.setTransform(268.4608,349.7856);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#000000").p("ACfBjIk9jF");
	this.shape_44.setTransform(361.625,423.075);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#000000").p("A0Ss4IVPZxIKeq8ICqFeIBBp6IFPlKg");
	this.shape_45.setTransform(287.8,385.6,1,1,0,0,0,0.4,0.1);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#FFFFFF").s().p("EgkEAkFMAAAhIJMBIJAAAMAAABIJg");
	this.shape_46.setTransform(361.225,376.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5}]},1).to({state:[]},1).wait(1));

	// img_mundo
	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().s("#000000").p("AAmAAQAAASgLAMQgLANgQAAQgPAAgLgNQgLgMAAgSQAAgRALgMQALgNAPAAQAQAAALANQALAMAAARg");
	this.shape_47.setTransform(383.8,461.85);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#000000").p("AAmAAQAAAQgLALQgLALgQAAQgPAAgLgLQgLgLAAgQQAAgPALgLQALgLAPAAQAQAAALALQALALAAAPg");
	this.shape_48.setTransform(382.55,448.8);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().s("#000000").p("ABtAAQAAAtggAgQggAggtAAQgsAAggggQggggAAgtQAAgsAgggQAgggAsAAQAtAAAgAgQAgAgAAAsg");
	this.shape_49.setTransform(335.475,456.325);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("#000000").p("AHDh2IAUAUQAXAZAPAXQAwBHg0AaQgzAah1AVIhqAPQhcAHh4ABQjvADiIgeQiJgdgegqQgJgNACgLIAEgKIBEhb");
	this.shape_50.setTransform(357.2963,487.733);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("#000000").p("AAgAzQgCgQgKgVQgTgogjgY");
	this.shape_51.setTransform(394.062,435.275);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#1D1D1B").p("AgdhBIAJAEQALAGAJALQAcAmgBBN");
	this.shape_52.setTransform(383.8739,275.6731);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("#000000").p("AkzsOIAngEQAwgBAuAQQCTAzBBDKIARBEQAQBVgCBaQgCA5gHAwIAHBkQARB1AwBgIAEAJQAxBxAAB6QAADXiqCBQgTALghAMQhBAYg+AIIgHAKQgHAMAAAPQABAwBHA3IAtgFQA5gJA1gYQCuhMBbjDQAhhFAJhWQAUiqhNjPQgYhAgeg8IgagwQgGgggFgwQgMhhAAhQQAAggADglQgBhKgehaQg8i0iOhOQgogbg9gZQh7gxhqAO");
	this.shape_53.setTransform(413.8152,361.728);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#000000").p("AgXA/QgBgXAFgbQAMg1AhgW");
	this.shape_54.setTransform(329.7517,276.175);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("#000000").p("AnPiXIgIBVQgEBcATAmQAUAmCoAcQBUANBQAGIA+AEQBNADBKgEQDsgOBvhQQAIghAFgqQAJhXgPg1");
	this.shape_55.setTransform(356.8133,470.0892);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#000000").p("AggAvQAMgUANgWQAbgqANgJ");
	this.shape_56.setTransform(319.55,435.375);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f().s("#000000").p("AEysTQgzgbhHAZQiNAzhgEIIgDCMQgECZgGA+IgDA/QgLBOgsBRIgQAmQgTAwgLAyQglCiAwB/IANAiQATAqAdAlQBeB1CkATIAKAIQALALACAPQAFAvhWBDQg5AAhOgiQichGhpitQhoiuBKkcQAXhZAnhZIAhhHQANgoALg5QAVhygMhWQAEhaAchoQA4jQByhIIAagPQAhgTAngQQB8gwCFAE");
	this.shape_57.setTransform(300.2995,362.3309);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().s("#000000").p("AChBTQgQgrgwgpQhhhUilAH");
	this.shape_58.setTransform(377.2644,419.382);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f().s("#000000").p("AiiBYQAMguAwgrQBfhYCvAH");
	this.shape_59.setTransform(336.5349,419.9404);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("#000000").p("ACQA7Qgkgkg2gfQhshAhcAU");
	this.shape_60.setTransform(375.1969,425.8137);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f().s("#000000").p("AiRA8QAogiA5gfQByhABVAO");
	this.shape_61.setTransform(338.2406,425.9397);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f().s("#000000").p("AAMCcQArgTAdgqQA5hUhKhyIAAATQgHAUgdABQgDgIgCgNQgEgbAKgZQACgHABgKQAAgUgJgPIgEAZQgNAggnApQgpAogWAiQgLAQgDAIIgBAPQAAASAGARQASA2BEAWIAKAHQALAIAHAHgAALDKIABgu");
	this.shape_62.setTransform(356.0698,387.6618);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().s("#000000").p("AAiBTIAAifIhDgCIAACj");
	this.shape_63.setTransform(356.95,415.7426);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().s("#000000").p("AgggUIBEgCIAOAQQAKARgRAMIhSAAQgJgCgDgHQgIgNAbgVg");
	this.shape_64.setTransform(356.8177,426.3226);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f().s("#000000").p("AjTgpIAYAYQAhAbArAOQCJAwC7he");
	this.shape_65.setTransform(357.2357,278.2677);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().s("#000000").p("AjEAlIAIgNQALgPARgMQA1gpBaAAIAgAAQAoABAhAHQBrAVABBB");
	this.shape_66.setTransform(356.9585,258.8538);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f().s("#000000").p("AEOnbIAagLQAfgOAUgQQA+gzhIgsQgWgSgbgbQg2g4gWgzIgUh6Qg4AfhNANQiZAchphUIgNBzQgFAVgTAfQgmA/hBAyQhCAyAyAxQAZAYAmAOIAPARQAOAagDAtQgJCTisEhIgeBaQgfBvgEBoQgPFPD9CWIBSAiQBlAiBhABQE4AFCalEQAmg6AEh7QAGj1ivk+QgegrgYg+Qgwh6AbhYIgPAGQiPA3jYgbQhDgJhDgQIg2gO");
	this.shape_67.setTransform(357.318,352.4497);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f().s("#000000").p("Ag5gQQAQgaAbAEIAYAXQAdAbAUAe");
	this.shape_68.setTransform(405.15,274.1862);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f().s("#000000").p("AgGgTQgLAhAfAC");
	this.shape_69.setTransform(412.0513,298.473);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f().s("#000000").p("ABgBiQgiAygwgpQgpgkgghQQgWg3gOhB");
	this.shape_70.setTransform(407.35,297.9032);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f().s("#000000").p("AgTo2QibgJicATQk6AlgICIQgJCHDNAPQBnAHBogUIAEARQADAWgJAXQgdBLiBA/QhIAiAQAeQAOAbBDANQBBANA9gJQBDgKAMghQALgdAgAhQAMAMA8BSQAzBGAhAbQAyAoAlgZQAkgYBAAYQAfALBVAwQBGAnAfAEQAvAHAMg0IAJgCQAMACANAMQArAnArCIQAsCHAGg2IgDhR");
	this.shape_71.setTransform(469.9586,286.7003);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f().s("#000000").p("AHSIPQgShtgJh8QgQj5A1hNQA1hOhlhtQgfgigsghIglgaQgGgFhMgZQiZgyldhkQiJgohdAN");
	this.shape_72.setTransform(483.3774,379.3061);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f().s("#000000").p("AgFjZQhABJAMCQQAFBIATA5IAbAXQAhAfAjAj");
	this.shape_73.setTransform(421.4411,355.5852);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f().s("#000000").p("Agzo0QBDCQgCCIQgDDoieDRQhPBphPA6IAPA8QAYBGAqAsQCGCPEIidICGhX");
	this.shape_74.setTransform(454.5536,464.4896);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f().s("#000000").p("AlrxPIgwB1QhoECAjBNQAMAZARgKQASgJgLgVQgRgiB6iwIB9iqIgLBJQgVBYg3BLQg7BSBKCbQBCCKBZA7QA/AphYBSQgtApg4AgIgYBqQgXCDAECDQAMGlEVEEQEUEFBJghQAkgQgThEQhBhAgbhKQg3iVC7g5QA8gRAjgP");
	this.shape_75.setTransform(241.4844,384.385);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f().s("#000000").p("AgvBYQAXg3AJgSQAYgxAog0");
	this.shape_76.setTransform(307.8425,427.644);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f().s("#000000").p("ABSByQgphLgxhJIgqg7QgMgHgVgL");
	this.shape_77.setTransform(302.734,350.0223);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f().s("#000000").p("ABJD2QifhFg4AYQg6AZgPhcQgFgdAAglIABgfQAXhNAhhDQBCiHA0A2QAzA2A8gdQAfgOAUgZIAXgOQAigRAzgL");
	this.shape_78.setTransform(273.6277,307.5798);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f().s("#000000").p("AHEDJQgEgLgGgMIgGgJQgggKgwgIQhfgPhLAKQhZANh8hHQgzgdgTgaQgVgcAcgLQAygVAXg8IAOg4QgOgVglgRQhKghh4AYQghAlgqAdQhTA8gsgj");
	this.shape_79.setTransform(279.4,250.3863);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f().s("#000000").p("AmoAUIC2ggQDGgbBNAeQBPAcBRgBQArgBA5gHQAvgCBVAS");
	this.shape_80.setTransform(354.8093,549.0491);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f().s("#000000").p("ApcgZIBPAdQBhAjBWAXQEVBLBIhDQBJhCCgAmQBRATBCAhIAsgBQA0gEAngOQB6gthAiG");
	this.shape_81.setTransform(346.4981,210.1059);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f().s("#000000").p("AcfAAQAAFyiPFRQiKFGj9D8Qj8D7lHCKQlTCOlzAAQlyAAlSiOQlIiKj8j7Qj9j8iKlGQiPlRAAlyQAAlwCPlSQCKlGD9j8QD8j7FIiKQFSiOFyAAQFzAAFTCOQFHCKD8D7QD9D8CKFGQCPFSAAFwg");
	this.shape_82.setTransform(356.975,374.65);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#FFFFFF").s().p("EgkEAkFMAAAhIJMBIJAAAMAAABIJg");
	this.shape_83.setTransform(361.225,376.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47}]},2).wait(1));

	// lbl_tiempo
	this.lbl_tiempo = new cjs.Text("1:27", "21px 'Arial'", "#FFFFFF");
	this.lbl_tiempo.name = "lbl_tiempo";
	this.lbl_tiempo.lineHeight = 27;
	this.lbl_tiempo.lineWidth = 287;
	this.lbl_tiempo.parent = this;
	this.lbl_tiempo.setTransform(75.9,979.45);
	this.lbl_tiempo._off = true;

	this.timeline.addTween(cjs.Tween.get(this.lbl_tiempo).wait(1).to({_off:false},0).wait(2));

	// titulo2
	this.instance = new lib.AudioTexto();
	this.instance.setTransform(371.55,52.9,1,1,0,0,0,69.2,11.1);
	this.instance.alpha = 0.6914;

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#3C3C3B").s().p("AhlhXIDLAAIhmCvg");
	this.shape_84.setTransform(594.375,739.025);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#FFFFFF").s().p("AgbA5QgKgKAAgUQAAgIADgKQACgJAFgJIAcg6IAPAAIgeA8IgEAHIABgDIADgEIgDAEIgBADIAEgHQAGgFAKAAQARAAAJAKQAKAKAAATQAAAUgKAKQgKALgSAAQgRAAgKgLgAgRAHQgGAIAAAOQAAAMAGAHQAGAIALAAQAMAAAGgIQAGgHAAgMIAAgBQAAgNgGgIQgHgHgLAAQgLAAgGAHg");
	this.shape_85.setTransform(406.475,820.425);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#FFFFFF").s().p("AAGBDIAAh6IgYAPIAAgOIASgNIATAAIAACGg");
	this.shape_86.setTransform(398.05,820.35);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#FFFFFF").s().p("AgZA/QgKgGgGgLQgFgLAAgQIAAglQAAgQAFgLQAGgLAKgGQALgGAOAAQAPAAALAGQAKAGAGALQAFALAAAQIAAAlQAAAQgFALQgGALgKAGQgLAGgPAAQgOAAgLgGgAgYguQgJAKAAARIAAAnQAAASAJAJQAJAKAPAAQAQAAAJgKQAJgJAAgSIAAgnQAAgRgJgKQgJgJgQgBQgPABgJAJg");
	this.shape_87.setTransform(384.075,820.35);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#FFFFFF").s().p("AgdBDIAAgMIgEAAIAAAMIgJAAIAAiGIANAAIAAB6IBIAAIAAAMgAgdBDIgEAAIAAgMIAEAAIAAAMg");
	this.shape_88.setTransform(373.05,820.35);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#FFFFFF").s().p("AgjA4QgLgMAAgZIAAhWIANAAIAABXQAAARAIAJQAJAJAQAAQARAAAJgJQAIgJAAgRIAAhXIANAAIAABWQAAAZgLAMQgMAMgYAAQgXAAgMgMg");
	this.shape_89.setTransform(360.825,820.425);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#FFFFFF").s().p("AgGBDIAAh5IgpAAIAAgNIBfAAIAAANIgpAAIAAgHIgNAAIAAAHIANAAIgNAAIAAgHIANAAIAAAHIAAB5g");
	this.shape_90.setTransform(350.025,820.35);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#FFFFFF").s().p("AgGBDIAAiGIANAAIAACGg");
	this.shape_91.setTransform(342.875,820.35);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#FFFFFF").s().p("AguBDIAAiGIAKAAIAAANIAEAAIAAgNIAmAAQAMABAJAFQAKAFAFAJQAEAJABANQgBAMgEAJQgFAJgKAFQgJAFgMAAIgmAAIAAgMIgEAAIAAAMIAEAAIAAA0gAAGADQAMAAAIgHQAHgIAAgNQAAgNgHgIQgIgIgMAAIgmAAIAAA5IAmAAgAgkAPIAAgMIAEAAIAAAMgAAGADIgmAAIAAg5IAmAAQAMAAAIAIQAHAIAAANQAAANgHAIQgIAHgMAAgAggADgAggg2IgEAAIAAgNIAEAAIAAANgAgkhDg");
	this.shape_92.setTransform(334.7,820.35);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#FFFFFF").s().p("AArBDIgLggIAEAAIAAgNIgJAAIAJAAIAAANIgEAAIgFgNIgbhKIgaBKIA1AAIAFANIg+AAIAEgNIgIAAIAAANIAEAAIgMAgIgPAAIAyiGIAPAAIAyCGgAgiAjIAAgNIAIAAIgEANgAAbAWgAgaAWIAahKIAbBKg");
	this.shape_93.setTransform(322.25,820.35);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#FFFFFF").s().p("AgYA+QgKgFgGgMQgGgLAAgPIAAglQAAgPAGgLQAGgMAKgFQALgHANAAQAMAAAKAFQAJAFAHAJQAGAIADALIgOAAQgCgIgFgFQgFgGgHgDQgHgEgHAAQgOAAgJALQgJALAAAQIAAAlQAAAQAJALQAJALAOAAQALgBAJgGQAKgHADgMIAOAAQgDALgGAIQgHAKgKAEQgJAFgMAAQgNAAgLgHg");
	this.shape_94.setTransform(310.425,820.35);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#FFFFFF").s().p("Ag1BHQgTgUAAglIAAgcQAAgkATgUQATgUAiAAQAjAAATAUQATAUAAAkIAAAdQAAAkgTAUQgTAUgjAAQgiAAgTgUgAgjg1QgMAOAAAZIAAAdQAAAZAMAOQANAOAWAAQAXAAANgOQANgOAAgZIAAgdQAAgZgNgOQgNgOgXAAQgWAAgNAOg");
	this.shape_95.setTransform(443.375,785.125);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#FFFFFF").s().p("AAUBzQgVAAgJgNQgLgLAAgXIAAhtIgSAAIAAgWIASAAIAAgzIAYAAIAAAzIgYAAIAYAAIAAAWIgYAAIAAgWIAAAWIAYAAIAABtQAAAMAFAGQAGAGAJAAIARAAIAAAXgAADgpIAAgWIAlAAIAAAWgAADg/g");
	this.shape_96.setTransform(427.8,782.6);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#FFFFFF").s().p("AgLB8IAAiwIAXAAIAACwgAgLhjIAAgYIAXAAIAAAYg");
	this.shape_97.setTransform(418.125,781.575);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#FFFFFF").s().p("AhFB+IAAj5IAYAAIAAAZIgDAFIADAiIgDgiIADgFIAAAmIAAgmQAJgOANgGQAQgHASAAQAcAAAQATQAPATAAAjIAAAmQAAAhgQATQgQATgdgBQgTAAgPgGQgNgGgHgNIAAgnQABAJAFAKQAFAKAKAIQAKAGAOABQAWAAAMgOQAMgNAAgXIAAgmQAAgZgMgNQgMgOgWAAQgOAAgKAHQgKAGgFALQgFAKgBAKIAAABIAAAxIgCAkIACAFIAABfgAgYAdQgKgIgFgKQgFgKgBgJIAAgCIAAgxIAAgBQABgKAFgKQAFgLAKgGQAKgHAOAAQAWAAAMAOQAMANAAAZIAAAmQAAAXgMANQgMAOgWAAQgOgBgKgGgAgtAfIAAAAgAgvAaIACgkIAAACIAAAnIgCgFg");
	this.shape_98.setTransform(404.375,788.6);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#FFFFFF").s().p("AgLB8IAAiwIAXAAIAACwgAgLhjIAAgYIAXAAIAAAYg");
	this.shape_99.setTransform(390.275,781.575);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#FFFFFF").s().p("AgyBIQgUgTAAgnIAAgcQAAgmAUgTQATgTAmAAQAVAAAQAHQAQAHALAOIgSAQQgKgLgLgFQgMgFgNAAQgaAAgNANQgNANAAAbIAAAcQAAAbANAOQANANAaAAQAOAAANgFQALgFAKgKIAQAPQgLAOgQAHQgQAHgVAAQgmAAgTgTg");
	this.shape_100.setTransform(377.6,785.125);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#FFFFFF").s().p("AAvBaIAAhqQAAgYgNgNQgMgNgWAAQgWAAgMAMQgLALgBAUIAAgnQAJgOAOgFQAPgIATAAQAdAAAPATQAQATAAAjIAABqgAhGBaIAAixIAYAAIAAAZIgDAGIADAiIAABwgAgxg4IADgGIAAAnIAAABg");
	this.shape_101.setTransform(358.675,785);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#FFFFFF").s().p("AgLB8IAAiwIAXAAIAACwgAgLhjIAAgYIAXAAIAAAYg");
	this.shape_102.setTransform(344.475,781.575);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#FFFFFF").s().p("Ag7BaIAAixIAYAAIAAAaIgDAFIADAiIAABwgAgmg4IADgFIAAAmIAAABgAgjgXIAAgmQAJgMAOgHQAOgJATAAQAMAAAKADQAKAEAHAHIgQAVQgFgGgIgDQgJgDgKAAQgWAAgMAMQgMAMgBATg");
	this.shape_103.setTransform(333.8,785);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#FFFFFF").s().p("AhUB8IAAj3IARAAIAHAAIAAAXIgHAAIAAgXIAAAXIAHAAIAABpIBIAAQAWAAANgOQAOgOAAgYQAAgYgOgPQgNgOgWAAIhIAAIAAgXIBHAAQAWAAARAJQARAKAJARQAJARAAAXQAAAXgJARQgJAQgRAJQgRAKgWAAIhHAAIAAgXIgHAAIAAAXIAHAAIAABggAhDAcIAAgXIAHAAIAAAXgAg8AFIAAhpIBIAAQAWAAANAOQAOAPAAAYQAAAYgOAOQgNAOgWAAgAg8hkgAg8hkg");
	this.shape_104.setTransform(314.875,781.575);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#FFFFFF").s().p("AALB8QgUAAgKgMQgLgMAAgXIAAjIIAYAAIAADJQABALAFAGQAFAGAJAAIARAAIAAAXg");
	this.shape_105.setTransform(289.55,781.575);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#FFFFFF").s().p("Ag2B8IAAgXIAAAXIgIAAIAAgXIAIAAICGAAIAAAXgAhPB8IAAj3IARAAIAAAXIAIAAIAABaIBzAAIAAAWIhzAAIAAgWIgIAAIAAAWIAIAAIAABZIgIAAIAAAXgAg2AMIgIAAIAAgWIAIAAIAAAWgAg2hkIAAgXICGAAIAAAXgAg2hkIgIAAIAAgXIAIAAIAAAXgAg+h7g");
	this.shape_106.setTransform(273.875,781.575);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#373C44").s().p("Eg4PAgbMAAAhA1MBwfAAAMAAABA1g");
	this.shape_107.setTransform(360,1072.5);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.lf(["#683FFF","#603ED9","#573EB4","#503D93","#4A3D78","#453D61","#413C50","#3E3C44","#3C3C3D","#3C3C3B"],[0,0.043,0.098,0.157,0.224,0.294,0.38,0.486,0.627,1],0,-640,0,640).s().p("Eg4PBkAMAAAjH/MBwfAAAMAAADH/g");
	this.shape_108.setTransform(360,640);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.instance}]},2).wait(1));

	// titulo1
	this.instance_1 = new lib.AudioTexto();
	this.instance_1.setTransform(371.55,52.9,1,1,0,0,0,69.2,11.1);
	this.instance_1.alpha = 0.6914;

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#3C3C3B").s().p("AhlhXIDLAAIhmCvg");
	this.shape_109.setTransform(594.375,739.025);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#FFFFFF").s().p("AgSBBQgJgEgFgIQgFgHgCgLIAOAAQACAKAGAFQAIAHAKAAQAMgBAHgGQAGgHAAgMIAAgDQAAgMgGgGQgHgGgLAAIgJAAIAAgMIAJAAQAKAAAGgFQAGgGAAgKIAAgEQAAgLgGgFQgHgGgLAAQgHAAgHAFQgGAGgDAJIgOAAQADgPALgJQAJgJAOAAQASAAAJAKQALAIAAASIAAADQAAAKgFAHQgFAHgIADQAJACAFAHQAGAJAAAMIAAADQgBASgJAKQgLAKgSAAQgLAAgIgEg");
	this.shape_110.setTransform(403.1,820.35);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#FFFFFF").s().p("AgZA/QgKgGgGgLQgFgLAAgQIAAglQAAgQAFgLQAGgLAKgGQALgGAOAAQAPAAALAGQAKAGAGALQAFALAAAQIAAAlQAAAQgFALQgGALgKAGQgLAGgPAAQgOAAgLgGgAgYguQgJAKAAARIAAAnQAAASAJAJQAJAKAPAAQAQAAAJgKQAJgJAAgSIAAgnQAAgRgJgKQgJgJgQgBQgPABgJAJg");
	this.shape_111.setTransform(387.075,820.35);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#FFFFFF").s().p("AgdBDIAAgMIgEAAIAAAMIgKAAIAAiGIAOAAIAAB6IBJAAIAAAMgAgdBDIgEAAIAAgMIAEAAIAAAMg");
	this.shape_112.setTransform(376.05,820.35);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#FFFFFF").s().p("AgjA4QgLgMAAgZIAAhWIANAAIAABXQAAARAIAJQAJAJAQAAQARAAAJgJQAIgJAAgRIAAhXIANAAIAABWQAAAZgLAMQgMAMgYAAQgXAAgMgMg");
	this.shape_113.setTransform(363.825,820.425);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#FFFFFF").s().p("AgGBDIAAh5IgpAAIAAgNIBfAAIAAANIgpAAIAAgHIgNAAIAAAHIANAAIgNAAIAAgHIANAAIAAAHIAAB5g");
	this.shape_114.setTransform(353.025,820.35);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#FFFFFF").s().p("AgGBDIAAiGIANAAIAACGg");
	this.shape_115.setTransform(345.875,820.35);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#FFFFFF").s().p("AgtBDIAAiGIAKAAIAAANIADAAIAAgNIAmAAQAMABAKAFQAIAFAFAJQAGAJAAANQAAAMgGAJQgFAJgIAFQgKAFgMAAIgmAAIAAgMIAmAAQANAAAHgHQAHgIAAgNQAAgNgHgIQgHgIgNAAIgmAAIAmAAQANAAAHAIQAHAIAAANQAAANgHAIQgHAHgNAAIgmAAIAAg5IAAA5IgDAAIAAAMIADAAIAAA0gAggAPgAggAPgAgjAPIAAgMIADAAIAAAMgAggADgAggADgAggg2IgDAAIAAgNIADAAIAAANgAgjhDg");
	this.shape_116.setTransform(337.7,820.35);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#FFFFFF").s().p("AArBDIgLggIAEAAIAAgNIgJAAIAJAAIAAANIgEAAIgFgNIgbhKIgaBKIA1AAIAFANIg+AAIAEgNIgIAAIAAANIAEAAIgMAgIgPAAIAyiGIAPAAIAyCGgAgiAjIAAgNIAIAAIgEANgAAbAWgAgaAWIAahKIAbBKg");
	this.shape_117.setTransform(325.25,820.35);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#FFFFFF").s().p("AgYA+QgKgFgGgMQgGgLAAgPIAAglQAAgPAGgLQAGgMAKgFQALgHANAAQAMAAAKAFQAJAFAHAJQAGAIADALIgOAAQgCgIgFgFQgFgGgHgDQgHgEgHAAQgOAAgJALQgJALAAAQIAAAlQAAAQAJALQAJALAOAAQALgBAJgGQAKgHADgMIAOAAQgDALgGAIQgHAKgKAEQgJAFgMAAQgNAAgLgHg");
	this.shape_118.setTransform(313.425,820.35);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#FFFFFF").s().p("Ag1BHQgTgUAAglIAAgcQAAgkATgUQATgUAiAAQAjAAATAUQATAUAAAkIAAAdQAAAkgTAUQgTAUgjAAQgiAAgTgUgAgjg1QgMAOAAAZIAAAdQAAAZAMAOQANAOAWAAQAXAAANgOQANgOAAgZIAAgdQAAgZgNgOQgNgOgXAAQgWAAgNAOg");
	this.shape_119.setTransform(443.375,785.125);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#FFFFFF").s().p("AAUBzQgVAAgJgNQgLgLAAgXIAAhtIgSAAIAAgWIASAAIAAgzIAYAAIAAAzIgYAAIAYAAIAAAWIgYAAIAAgWIAAAWIAYAAIAABtQAAAMAFAGQAGAGAJAAIARAAIAAAXgAADgpIAAgWIAlAAIAAAWgAADg/g");
	this.shape_120.setTransform(427.8,782.6);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#FFFFFF").s().p("AgLB8IAAiwIAXAAIAACwgAgLhjIAAgYIAXAAIAAAYg");
	this.shape_121.setTransform(418.125,781.575);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#FFFFFF").s().p("AhFB+IAAj5IAYAAIAAAZIgDAFIADAiIgDgiIADgFIAAAmIAAgmQAJgOANgGQAQgHASAAQAcAAAQATQAPATAAAjIAAAmQAAAhgQATQgQATgdgBQgTAAgPgGQgNgGgHgNIAAgnQABAJAFAKQAFAKAKAIQAKAGAOABQAWAAAMgOQAMgNAAgXIAAgmQAAgZgMgNQgMgOgWAAQgOAAgKAHQgKAGgFALQgFAKgBAKIAAABIAAAxIgCAkIACAFIAABfgAgYAdQgKgIgFgKQgFgKgBgJIAAgCIAAgxIAAgBQABgKAFgKQAFgLAKgGQAKgHAOAAQAWAAAMAOQAMANAAAZIAAAmQAAAXgMANQgMAOgWAAQgOgBgKgGgAgtAfIAAAAgAgvAaIACgkIAAACIAAAnIgCgFg");
	this.shape_122.setTransform(404.375,788.6);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#FFFFFF").s().p("AgLB8IAAiwIAXAAIAACwgAgLhjIAAgYIAXAAIAAAYg");
	this.shape_123.setTransform(390.275,781.575);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#FFFFFF").s().p("AgyBIQgUgTAAgnIAAgcQAAgmAUgTQATgTAmAAQAVAAAQAHQAQAHALAOIgSAQQgKgLgLgFQgMgFgNAAQgaAAgNANQgNANAAAbIAAAcQAAAbANAOQANANAaAAQAOAAANgFQALgFAKgKIAQAPQgLAOgQAHQgQAHgVAAQgmAAgTgTg");
	this.shape_124.setTransform(377.6,785.125);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#FFFFFF").s().p("AAvBaIAAhqQAAgYgNgNQgMgNgWAAQgWAAgMAMQgLALgBAUIAAgnQAJgOAOgFQAPgIATAAQAdAAAPATQAQATAAAjIAABqgAhGBaIAAixIAYAAIAAAZIgDAGIADAiIAABwgAgxg4IADgGIAAAnIAAABg");
	this.shape_125.setTransform(358.675,785);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#FFFFFF").s().p("AgLB8IAAiwIAXAAIAACwgAgLhjIAAgYIAXAAIAAAYg");
	this.shape_126.setTransform(344.475,781.575);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#FFFFFF").s().p("Ag7BaIAAixIAYAAIAAAaIgDAFIADAiIAABwgAgmg4IADgFIAAAmIAAABgAgjgXIAAgmQAJgMAOgHQAOgJATAAQAMAAAKADQAKAEAHAHIgQAVQgFgGgIgDQgJgDgKAAQgWAAgMAMQgMAMgBATg");
	this.shape_127.setTransform(333.8,785);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#FFFFFF").s().p("AhUB8IAAj3IARAAIAHAAIAAAXIgHAAIAAgXIAAAXIAHAAIAABpIBIAAQAWAAANgOQAOgOAAgYQAAgYgOgPQgNgOgWAAIhIAAIAAgXIBHAAQAWAAARAJQARAKAJARQAJARAAAXQAAAXgJARQgJAQgRAJQgRAKgWAAIhHAAIAAgXIgHAAIAAAXIAHAAIAABggAhDAcIAAgXIAHAAIAAAXgAg8AFIAAhpIBIAAQAWAAANAOQAOAPAAAYQAAAYgOAOQgNAOgWAAgAg8hkgAg8hkg");
	this.shape_128.setTransform(314.875,781.575);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#FFFFFF").s().p("AALB8QgUAAgKgMQgLgMAAgXIAAjIIAYAAIAADJQABALAFAGQAFAGAJAAIARAAIAAAXg");
	this.shape_129.setTransform(289.55,781.575);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#FFFFFF").s().p("Ag2B8IAAgXIAAAXIgIAAIAAgXIAIAAICGAAIAAAXgAhPB8IAAj3IARAAIAAAXIAIAAIAABaIBzAAIAAAWIhzAAIAAgWIgIAAIAAAWIAIAAIAABZIgIAAIAAAXgAg2AMIgIAAIAAgWIAIAAIAAAWgAg2hkIAAgXICGAAIAAAXgAg2hkIgIAAIAAgXIAIAAIAAAXgAg+h7g");
	this.shape_130.setTransform(273.875,781.575);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#373C44").s().p("Eg4PAgbMAAAhA1MBwfAAAMAAABA1g");
	this.shape_131.setTransform(360,1072.5);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.lf(["#683FFF","#603ED9","#573EB4","#503D93","#4A3D78","#453D61","#413C50","#3E3C44","#3C3C3D","#3C3C3B"],[0,0.043,0.098,0.157,0.224,0.294,0.38,0.486,0.627,1],0,-640,0,640).s().p("Eg4PBkAMAAAjH/MBwfAAAMAAADH/g");
	this.shape_132.setTransform(360,640);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.instance_1}]},1).to({state:[]},1).wait(1));

	// btn_cap16
	this.btn_cap16 = new lib.btn_cap16();
	this.btn_cap16.name = "btn_cap16";
	this.btn_cap16.setTransform(526.2,1188.9,1,1,0,0,0,90.9,30.9);
	new cjs.ButtonHelper(this.btn_cap16, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.btn_cap16).to({_off:true},1).wait(2));

	// btn_cap3
	this.btn_cap3 = new lib.btn_cap3();
	this.btn_cap3.name = "btn_cap3";
	this.btn_cap3.setTransform(190.9,1188.9,1,1,0,0,0,90.9,30.9);
	new cjs.ButtonHelper(this.btn_cap3, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.btn_cap3).to({_off:true},1).wait(2));

	// otros
	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#FFFFFF").s().p("AhuCAQgqguAAhSQAAhQAqgvQApgvBFgBQBGABAqAvQApAvAABQQAABSgpAuQgqAwhGgBQhFABgpgwgAhGhfQgZAgAAA/QAAA/AZAhQAaAfAsAAQAtAAAagfQAZghAAg/QAAg/gZggQgagfgtAAQgsAAgaAfg");
	this.shape_133.setTransform(531.05,392.35);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#FFFFFF").s().p("AgnC+QgbgcAAg7IAAixIgmAAIAAguIAmAAIAAhhIA4AAIAABhIBzAAIAAAuIhzAAIAACXIABApQABAPAIANQAFAMAMAFQALAGAYgBQANAAAPgDQAPgFAHgDIADAAIAAAzIgjAHQgSADgPAAQgyAAgagcg");
	this.shape_134.setTransform(500.825,387.9);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#FFFFFF").s().p("AgbDfIAAlLIA3AAIAAFLgAgfikIAAg6IA/AAIAAA6g");
	this.shape_135.setTransform(480.275,386.675);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#FFFFFF").s().p("AiRDoIAAnGIA3AAIAAAjQAXgTAcgMQAbgNAfAAQA9AAAhAtQAiAugBBQQAAApgLAhQgMAhgVAXQgUAWgaAMQgbAMgdAAQgaAAgUgFQgVgGgXgMIAACLgAgrinQgYAKgXARIAAC7QAYALASAEQAQAEAXAAQAtAAAbggQAagfAAg9QAAg8gVgeQgUgegrAAQgXAAgZALg");
	this.shape_136.setTransform(454.1,398.025);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#FFFFFF").s().p("AgbDfIAAlLIA3AAIAAFLgAgfikIAAg6IA/AAIAAA6g");
	this.shape_137.setTransform(425.725,386.675);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#FFFFFF").s().p("AglCjQgegKgVgVQgWgWgMghQgMggAAgtQAAhQAtguQAtgvBIAAQAdAAAcAIQAbAIAXAMIAAA+IgDAAQgagUgbgLQgbgLgaAAQgvABgbAgQgcAfAAA9QAAA9AbAgQAbAgAwABQARgBARgEQASgEAOgIIAXgNIARgMIADAAIAAA9QgcAOgZAHQgZAIgdAAQgjAAgegLg");
	this.shape_138.setTransform(402.175,392.35);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#FFFFFF").s().p("ABTCrIAAi8QAAgXgDgVQgCgTgHgMQgIgNgOgFQgOgHgWABQgWgBgZALQgZAMgXARIAAD4Ig4AAIAAlLIA4AAIAAAkQAagWAcgMQAcgMAdAAQA1AAAdAhQAcAgAAA9IAADXg");
	this.shape_139.setTransform(366.375,391.9);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#FFFFFF").s().p("AgbDfIAAlLIA3AAIAAFLgAgfikIAAg6IA/AAIAAA6g");
	this.shape_140.setTransform(338.725,386.675);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#FFFFFF").s().p("AhnCmIAAlLIA4AAIAAAxQAigbAYgLQAagLAaAAIAVAAIAUADIAAA6IgDAAIgYgFQgMgBgQAAQgaAAgXAMQgYALgXASIAADrg");
	this.shape_141.setTransform(320.175,392.375);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#FFFFFF").s().p("AiQDeIAAm7IB4AAQAnAAAcAHQAbAHAWAOQAZARAPAZQANAaAAAmQAAAegKAZQgKAZgTASQgXAXgfALQgfALgvAAIg7AAIAACmgAhVAGIAyAAQAjAAAWgGQAWgGAOgOQAOgOAGgQQAGgQAAgTQAAgXgIgRQgJgRgPgLQgPgJgSgEQgTgEgaAAIg7AAg");
	this.shape_142.setTransform(287.95,386.825);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#FFFFFF").s().p("AgbDoIAAnPIA3AAIAAHPg");
	this.shape_143.setTransform(237.85,385.825);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#FFFFFF").s().p("AiRDeIAAm7IEjAAIAAA1IjoAAIAAB5IDoAAIAAA0IjoAAIAACkIDoAAIAAA1g");
	this.shape_144.setTransform(211.575,386.825);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f().s("#000000").ss(4).p("ABgAdIi/g5");
	this.shape_145.setTransform(166.125,529.725);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f().s("#000000").ss(4).p("ABUgaIinA0");
	this.shape_146.setTransform(567.35,529.45);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f().s("#000000").ss(4).p("Ao5BsIRbjTIAIBj");
	this.shape_147.setTransform(213.5851,518.0189);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f().s("#000000").ss(4).p("AHjkUIBjIRIyflH");
	this.shape_148.setTransform(220.0605,534.4572);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#AA3100").s().p("ApPg9IQ8jLIBjIRg");
	this.shape_149.setTransform(219.05,533.25);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f().s("#000000").ss(6).p("ABDHLIPLEbMgglADlIGtvOIoEliIPipUIANVeIAEgB");
	this.shape_150.setTransform(168.9926,486.7649);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#D44400").s().p("Ao6gMIoDlhIPipVIANVeIADAAIC/AmIPKEcMggkADlg");
	this.shape_151.setTransform(164.125,487.625);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f().s("#000000").ss(6).p("AByGmIAM1eIOYJUIndFiIGMPPI9+jYIOEka");
	this.shape_152.setTransform(564.3775,484.5773);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#D44400").s().p("AvnLsIQrlQIAM1eIOYJVIndFhIGMPPg");
	this.shape_153.setTransform(568.975,485.55);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f().s("#000000").ss(6).p("EAgwgP+MAAAAlFQyYlz5YCUQn8AunsBdQibAdiFAeIhnAZMAAAgkoIBfghQB9gpCQgoQHOh/HuhBQKzhcKMAtQMxA5LHELg");
	this.shape_154.setTransform(366.15,391.7293);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#D44400").s().p("ArBRuQn7AuntBdQiaAdiFAeIhnAYMAAAgknIBfghQB9gqCQgnQHPh/HthCQKyhbKNAtQMwA4LIELMAAAAlFQyYlz5ZCVg");
	this.shape_155.setTransform(366.15,391.1832);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f().s("#000000").ss(4).p("AImg4Iw1E2IB8oT");
	this.shape_156.setTransform(515.7934,532.9321);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#AA3100").s().p("AmekJIO5DdIw1E2g");
	this.shape_157.setTransform(516.875,531.725);

	this.instance_2 = new lib.Rectangle();
	this.instance_2.setTransform(360,640,1,1,0,0,0,360,640);
	this.instance_2.alpha = 0.3906;

	this.instance_3 = new lib.Group_1();
	this.instance_3.setTransform(371.05,553.2,1,1,0,0,0,346.1,534.7);
	this.instance_3.alpha = 0.6094;

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#FFE77F").s().p("AAZAlQgxg7gpg+ICDCpQgQgSgZgeg");
	this.shape_158.setTransform(349.825,914.4);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#FFE77F").s().p("AAvAwQgMgHhZhaIBtBjg");
	this.shape_159.setTransform(343.125,923.85);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#FFE77F").s().p("AADgRIAVgmIgvBvQAFgdAVgsg");
	this.shape_160.setTransform(384.775,873.475);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#FFE77F").s().p("AgqATQgDAZADgDQACgEBYhSIhfBbg");
	this.shape_161.setTransform(368.45,902.0875);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#FFE77F").s().p("AgFgZIAdg8IgqCrQgPgrAchEg");
	this.shape_162.setTransform(379.0747,910.95);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#FFE77F").s().p("Ah7BDID3iHIhlBMQhZA9grAAQgIAAgGgCg");
	this.shape_163.setTransform(359.625,875.3195);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#FFE77F").s().p("AgJgQIgDgoIAZBxQgPgcgHgtg");
	this.shape_164.setTransform(318.725,886.825);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#FFE77F").s().p("AAuAsQgBACgIAAQgMAAgoguIgmguIBsBcIgJgCg");
	this.shape_165.setTransform(318.35,899.7);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f().s("#000000").p("AABADIgBgF");
	this.shape_166.setTransform(306.225,1007.5);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f().s("#000000").p("AhpBlIAkDfICShiIAcg2QgWgvgHjoIgCjh");
	this.shape_167.setTransform(314.5058,1008.3709);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f().s("#000000").p("AAehbIgWBSQgXBUgNAN");
	this.shape_168.setTransform(380.7418,1017.8116);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f().s("#000000").p("Ah+BCQABAAAeACQAkABAhgIQBogbAxhp");
	this.shape_169.setTransform(360.725,1039.4004);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f().s("#000000").p("AiogNIB9AVQCLAQBIga");
	this.shape_170.setTransform(346.0691,1037.6514);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f().s("#000000").p("AAYhhIgvDD");
	this.shape_171.setTransform(382.05,992.9);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f().s("#000000").p("AgogRIA4gCIAVAr");
	this.shape_172.setTransform(367.9158,949.3986);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#AD6714").s().p("AgmgSIA4gDIAVArg");
	this.shape_173.setTransform(367.7,949.55);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f().s("#000000").p("AggBuQALgYALgkQAUhHAIhJQAtBshfBgg");
	this.shape_174.setTransform(512.7181,1019.9292);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#BC640C").s().p("AgKArQAUhHAIhJQAtBrhfBgQALgXALgkg");
	this.shape_175.setTransform(512.7181,1020.675);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#CFD400").s().p("AjeG2IgTgIQgugYgjgqIgaglIg2ihQgzhqgMheIgChKIA2BBIAWiYIAeAIIAThyIAeApIATgRQADgXgEgRIgFgLIAhgLQAOALgDA2IBEhMIAWALIAegxIAVAQIADA/QA8gfBWhDIBMg8QAhAWgEARQgBAIgJAEIAUAkIB1haIAFBJIAugjIhkB4IAuAIIBRghIAOAeIApgFIgpBaQBIgYAZAMQANAGgBALIiDBtIBKAOQgrAPghA3QgRAbgIAYQAfAAAJAPQAFAIgBAHIACAsIgoBfIgKAyQgLA1gHALQgsBOg6AnQgeATgUADQgXADgEASIgKABQg2AAkLghg");
	this.shape_176.setTransform(352.6578,898.0551);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#FFE77F").s().p("AggARIiIgTIADgbQEwAkAcgFQgDAMAFANQgRADgbAAQg5AAhkgNg");
	this.shape_177.setTransform(346.925,944.8838);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#FFE77F").s().p("AgCgGIAJgyQAbAlgZAqQgLAVgSANQAHgLALg0g");
	this.shape_178.setTransform(383.5828,923.375);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#FFE77F").s().p("AgmgNQACgWALgZIALgTIA2CgQhWgWAIhIg");
	this.shape_179.setTransform(313.8201,922.7);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f().s("#000000").p("AOpF0QgehHhOg9QgnAwgoAeQAugrAcgnIgUgOQiyiGkqgvQhdgPhegEIhLgBQilAUiGgJIhkgOQhygHj1hFIj1hOIgDiYICpAWQCTATA2gJQCTBmDrgsQB2gXBXgrQFYilEHBiQCDAwA/BSQB8CPglCXQAwB9gQCag");
	this.shape_180.setTransform(420.8813,973.2858);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#B77723").s().p("AM9DvQgnAvgoAeQAugqAcgnIgUgOQiyiHkqgvQhdgOhegEIhLgCQilAViGgKIhkgNQhygHj1hGIj1hNIgDiZICpAXQCTASA2gIQCTBmDrgtQB2gWBXgrQFYilEHBhQCDAxA/BRQB8CQglCWQAwB9gQCaQgehGhOg9g");
	this.shape_181.setTransform(420.886,973.4393);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f().s("#000000").p("AAbALIgzAsIAYhqg");
	this.shape_182.setTransform(306.4753,1013.032);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f().s("#000000").p("AmJgwIAAAAIgQgxIAuhPIgIhSIBBiAIgQggIAjg8IB7gsIDeBGQD1BGByAHQAJBtgXB8QgLA+gNAoIBKAWQBFB0APBAQAHAfgHAIQk0GZl+huQh4gjhxhSIhZhLIgzicQgog/BPhKQAagWAjgWQAVgNAMgGIgYBqIA0gsg");
	this.shape_183.setTransform(345.7555,1012.6784);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#23470B").s().p("AiZH0Qh4gjhxhSIhZhLIgzicQgog/BPhKQAagWAjgWQAVgNAMgGIgYBqIA0gsIgcg+IAAAAIgQgxIAuhPIgIhSIBBiAIgQggIAjg8IB7gsIDeBGQD1BGByAHQAJBtgXB8QgLA+gNAoIBKAWQBFB0APBAQAHAfgHAIQjzFCkhAAQhNAAhRgXg");
	this.shape_184.setTransform(345.7555,1012.6918);

	this.instance_4 = new lib.Path();
	this.instance_4.setTransform(462.55,139.05,1,1,0,0,0,219.1,73.8);
	this.instance_4.alpha = 0.8984;

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f().s("#000000").p("ACmhYIigCfIiuAeg");
	this.shape_185.setTransform(76.8636,370.3107);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#CDE1F9").s().p("ACoheIihCfIitAeg");
	this.shape_186.setTransform(76.75,370.95);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f().s("#000000").p("AMlu2IAAB7I4rbXg");
	this.shape_187.setTransform(137.4503,288.0365);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#CDE1F9").s().p("AMWuoIAAB7I4rbWg");
	this.shape_188.setTransform(139,286.7);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f().s("#000000").p("AMgt5I4rdSISR/Ug");
	this.shape_189.setTransform(137.9626,281.9647);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#CDE1F9").s().p("AF8vqIGaCDI4rdRg");
	this.shape_190.setTransform(139,280.2);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f().s("#000000").p("ARmlUMgi6AT6Iae9Xg");
	this.shape_191.setTransform(170.9149,287.0636);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#CDE1F9").s().p("AJCurIIcJdMgi6AT6g");
	this.shape_192.setTransform(171.75,286.45);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.lf(["rgba(0,0,0,0)","rgba(244,253,59,0)","#F4FD3B","#FCEA10","#F9E710","#EEDD0F","#DDCD0E","#C4B60C","#A4990A","#7D7408","#4F4A05","#1B1902","#000000"],[0,0.416,0.416,0.737,0.78,0.812,0.843,0.875,0.906,0.933,0.961,0.988,1],0,-124.2,0,124.2).s().p("Eg4PATQIAA1eQJdn9OKkiQOpksQnAAQR6AAPgFaQPCFRJMJBIAATHg");
	this.shape_193.setTransform(360,1155.775);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.lf(["#000000","#090902","#34370E","#5E6218","#828822","#A0A82A","#BAC430","#CFDA36","#DFEB3A","#EBF63D","#F1FD3F","#F3FF3F","#F4FD3B","rgba(244,253,59,0)","rgba(0,0,0,0)"],[0.016,0.016,0.024,0.035,0.043,0.055,0.067,0.082,0.098,0.118,0.149,0.227,0.416,0.416,1],0,-124.2,0,124.2).s().p("Eg4PATQIAA1eQJdn9OKkiQOpksQnAAQR6AAPgFaQPCFRJMJBIAATHg");
	this.shape_194.setTransform(360,1155.775);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.lf(["#3F00E9","#000594"],[0.075,1],0,-641.7,0,641.7).s().p("Eg4WBkRMAAAjIhMBwtAAAMAAADIhg");
	this.shape_195.setTransform(359.325,638.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.instance_4},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.instance_3},{t:this.instance_2},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133}]}).to({state:[]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(358.7,636.7,361.3,643.3);
// library properties:
lib.properties = {
	id: 'CF76DBFB406E4A4CBBB1F4BD35A29896',
	width: 720,
	height: 1280,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"sounds/audio_cap16.mp3", id:"audio_cap16"},
		{src:"sounds/audio_cap3.mp3", id:"audio_cap3"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['CF76DBFB406E4A4CBBB1F4BD35A29896'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;