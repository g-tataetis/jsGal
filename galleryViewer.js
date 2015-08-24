function Gallery( identifier ) {
    
    var _Gallery = this;
    this.identifier = identifier;
    this.containerElem = document.querySelector( this.identifier );
    
    this.counterStatus = 1;
    this.pointersStatus = 1;
    this.nextButtonText = '&#x2192;';
    this.nextButtonId = 'galleryNextButton';
    this.prevButtonText = '&#x2190;';
    this.prevButtonId = 'galleryPrevButton';
    this.wrapperElemId = 'galleryWrapper';
    this.closeStatus = 1;
    this.closeButtonText = '&#x2715;';
    this.closeButtonId = 'galleryCloseButton';
    this.fullscreenStatus = 1;
    this.fullscreenDownButtonText = '&#x25F1;';
    this.fullscreenUpButtonText = '&#x25F3;';
    this.fullscreenButtonId = 'galleryFullscreenButton';
    this.expandPerc = '95%';
    this.slideshowStatus = 1;
    this.slideshowPlayButtonText = '&#x25b6;';
    this.slideshowPauseButtonText = '&#x25a0;';
    this.slideshowButtonId = 'gallerySlideshowButton';
    this.rightClickGuardStatus = 1;
    this.scrollStatus = 1;
    this.currentPointer = 0;
    this.captionStatus = 1;
    this.captionElemId = 'galleryCaption';
    
    this.imgs = [];
    this.sources = [];
    this.alts = [];
    this.bodyTag = null;
    this.wrapper = null;
    this.displayImage = null;
    this.nextButton = null;
    this.prevButton = null;
    this.closeButton = null;
    this.pointer = null;
    this.fullscreenButton = null;
    this.slideshowButton = null;
    this.caption = null;
    
    this.expandTo = function( perc ) {
        
        this.expandPerc = perc;
        
        return this;
        
    };
    
    this.captionId = function( id ) {
        
        this.captionElemId = id;
        
        return this;
        
    };
    
    this.wrapperId = function( id ) {
        
        this.wrapperElemId = id;
        
        return this;
        
    };
    
    this.slideshowId = function( id ) {
        
        this.slideshowButtonId = id;
        
        return this;
        
    };
    
    this.goFullText = function( text ) {
        
        this.fullscreenDownButtonText = text;
        
        return this;
        
    };
    
    this.leaveFullText = function( text ) {
        
        this.fullscreenUpButtonText = text;
        
        return this;
        
    };
    
    this.fullscreenId = function( id ) {
        
        this.fullscreenButtonId = id;
        
        return this;
        
    };
    
    this.closeId = function( id ) {
        
        this.closeButtonId = id;
        
        return this;
        
    };
    
    this.closeText = function( text ) {
        
        this.closeButtonText = text;
        
        return this;
        
    };
    
    this.prevText = function( text ) {
        
        this.prevButtonText = text;
        
        return this;
        
    };
    
    this.prevId = function( id ) {
        
        this.prevButtonId = id;
        
        return this;
        
    };
    
    this.nextText = function( text ) {
        
        this.nextButtonText = text;
        
        return this;
        
    };
    
    this.nextId = function( id ) {
        
        this.nextButtonId = id;
        
        return this;
        
    };
    
    this.enableRightClick = function() {
        
        this.rightClickGuardStatus = 0;
        
        return this;
        
    };
    
    this.disableCaption = function() {
        
        this.captionStatus = 0;
        
        return this;
        
    };
    
    this.disableScroll = function() {
        
        this.scrollStatus = 0;
        
        return this;
        
    };
    
    this.disablePointers = function() {
        
        this.pointersStatus = 0;
        
        return this;
        
    };
    
    this.disableFullscreen = function() {
        
        this.fullscreenStatus = 0;
        
        return this;
        
    };
    
    this.disableCounter = function( status ) {
        
        this.counterStatus = 0;
        
        return this;
        
    };
    
    this.disableSlideshow = function() {
        
        this.slideshowStatus = 0;
        
        return this;
        
    };
    
    this.disableClose = function() {
        
        this.closeStatus = 0;
        
        return this;
        
    };
    
    this.handleEvent = function( event ) {
        
        if ( _Gallery.displayImage !== null ) {
        
            if ( event.target === _Gallery.displayImage.elem ) {
                
                _Gallery.nextImage();

            }
            
        } else {
        
            _Gallery.create( event );
            
        }
        
    };
    
    this.create = function( event ) {
        
        this.bodyTag = new Body();
        this.wrapper = new Wrapper();
        this.displayImage = new DisplayImage( event.target );
        this.nextButton = new NextButton();
        this.prevButton = new PrevButton();
        this.closeButton = new CloseButton();
        this.pointer = new Pointer();
        this.fullscreenButton = new FullscreenButton();
        this.slideshowButton = new SlideshowButton();
        this.caption = new Caption();
        
    };
    
    this.nextImage = function() {
                
        if ( _Gallery.currentPointer < _Gallery.sources.length - 1 ) {

            _Gallery.currentPointer++;
            _Gallery.displayImage.destroy();
            _Gallery.displayImage = null;
            _Gallery.displayImage = new DisplayImage( _Gallery.imgs[ _Gallery.currentPointer ] );
            _Gallery.pointer.update();
            _Gallery.caption.assign();
            
        }
        
    };
    
    this.prevImage = function() {
                
        if ( _Gallery.currentPointer > 0 ) {

            _Gallery.currentPointer--;
            _Gallery.displayImage.destroy();
            _Gallery.displayImage = null;
            _Gallery.displayImage = new DisplayImage( _Gallery.imgs[ _Gallery.currentPointer ] );
            _Gallery.pointer.update();
            _Gallery.caption.assign();
            
        }
        
    };
    
    this.load = function() {
        
        this.imgs = this.containerElem.querySelectorAll('img');
        
        for ( var i=0 ; i<this.imgs.length ; i++ ) {
            
            this.getCaption( this.imgs[i] );
            this.sources.push( this.imgs[i].src );
            this.imgs[i].addEventListener( 'click', this, false );
            
        }

    };
    
    this.getCaption = function( img ) {
        
        if ( img.title !== "" ) {
            
            this.alts.push( img.title );
            
        } else if ( img.alt !== "" ) {
            
            this.alts.push( img.alt );
            
        } else {
            
            this.alts.push( "" );
            
        }
        
    };
    
    this.destroy = function() {
        
        this.bodyTag.restoreBody();
        
        if ( typeof this.caption.destroy === 'function' ) {
            
            this.caption.destroy();
            this.caption = null;
            
        }
        
        if ( typeof this.slideshowButton.destroy === 'function' ) {
            
            this.slideshowButton.destroy();
            this.slideshowButton = null;
            
        }
        
        if ( typeof this.fullscreenButton.destroy === 'function' ) {
            
            this.fullscreenButton.destroy();
            this.fullscreenButton = null;
            
        }
        
        if ( typeof this.pointer.destroy === 'function' ) {
            
            this.pointer.destroy();
            this.pointer = null;
            
        }
        
        if ( typeof this.closeButton.destroy === 'function' ) {
            
            this.closeButton.destroy();
            this.closeButton = null;
            
        }
        
        if ( typeof this.nextButton.destroy === 'function' ) {
            
            this.nextButton.destroy();
            this.nextButton = null;
            
        }
        
        if ( typeof this.prevButton.destroy === 'function' ) {
            
            this.prevButton.destroy();
            this.prevButton = null;
            
        }
               
        this.displayImage.destroy();
        this.wrapper.destroy();
        
        this.nextButton = null;
        this.prevButton = null;
        this.displayImage = null;
        this.wrapper = null;
        
    };
    
    this.scroll = function( deltaY ) {
        
        if ( this.scrollStatus === 0 ) { return null; }
        
        if ( deltaY > 0 ) {
                    
            _Gallery.nextImage();

        } else if ( deltaY < 0 ) {

            _Gallery.prevImage();

        }
        
    };
    
    var Body = function() {
        
        this.alterBody = function() {
            
            console.log( getComputedStyle( document.body ) );
            _Body.originalMargin = getComputedStyle( document.body )['margin'];
            _Body.originalOverflow = getComputedStyle( document.body )['overflow'];
            document.body.style.margin = '0';
            document.body.style.overflow = 'hidden';
            
        };
        
        this.restoreBody = function() {
            
            document.body.style.margin = _Body.originalMargin;
            document.body.style.overflow = _Body.originalOverflow;
            
        };
        
        var _Body = this;
        this.originalMargin = null;
        this.originalOverflow = null;
        
        this.alterBody();
        
    };
    
    var Wrapper = function() {
        
        this.align = function() {
            
            this.elem.style.width = window.innerWidth + 'px';
            this.elem.style.height = window.innerHeight + 'px';
            
        };
        
        var _Wrapper = this;
        this.elem = document.createElement("DIV");
        this.elem.setAttribute( 'id', _Gallery.wrapperElemId );
        document.body.appendChild( this.elem );
        this.elem.style.overflow = 'hidden';
        this.elem.style.position = 'absolute';
        this.elem.style.textAlign = 'center';
        this.elem.style.top = 0;
        this.elem.style.left = 0;
        
        this.align();
        
        this.elem.addEventListener( 'click', this, false );
        this.elem.addEventListener( 'wheel', this, false );
        this.elem.addEventListener( 'contextmenu', this, false );
        document.body.addEventListener( 'keydown', this, false );
        window.addEventListener( 'resize', this, false );
        
        this.handleEvent = function( event ) {
//            console.log( event );
            if ( event.type === 'click' ) {
                
                if ( event.target === _Wrapper.elem ) {
                
                    _Gallery.destroy();

                }
                
            } else if ( event.type === 'keydown' ) {
//                console.log(event);
                if ( event.keyCode === 39 ) {
                    
                    event.preventDefault();
                    _Gallery.nextImage();
                    
                } else if ( event.keyCode === 37 ) {
                    
                    event.preventDefault();
                    _Gallery.prevImage();
                    
                } else if ( event.keyCode === 27 ) {
                    
                    _Gallery.destroy();
                    
                }
                
            } else if ( event.type === 'resize' ) {
                
                _Wrapper.align();
                
            } else if ( event.type === 'wheel' ) {
                
                _Gallery.scroll( event.deltaY );
                
            } else if ( event.type === 'contextmenu' ) {
                
                if ( _Gallery.rightClickGuardStatus === 1 ) {
                
                    event.preventDefault();
                    
                }
                
            }
            
        };
        
        this.destroy = function() {
            
            window.addEventListener( 'resize', this, false );
            document.body.removeEventListener( 'keydown', this, false );
            this.elem.removeEventListener( 'click', this, false );
            this.elem.parentElement.removeChild( this.elem );
            _Wrapper = null;
            
        };
        
    };
    
    var DisplayImage = function( img ) {
        
        var _DisplayImage = this;
        this.elem = new Image();
        this.elem.style.opacity = 0;
        this.elem.src = img.src;
        this.elem.setAttribute( 'alt', img.alt );
        _Gallery.wrapper.elem.appendChild( this.elem );
        
        this.elem.addEventListener( 'click', _Gallery, false );
        window.addEventListener( 'resize', this, false );
            
        this.elem.style.position = "absolute";
        
        this.handleEvent = function( event ) {
            
            _DisplayImage.align();
            
        };
        
        this.align = function() {
            
            var containerWidth = _Gallery.wrapper.elem.clientWidth;
            var containerHeight = _Gallery.wrapper.elem.clientHeight;
            
            if ( ( containerHeight/containerWidth ) < ( this.elem.clientHeight/this.elem.clientWidth ) ) {
                
                this.elem.style.height = _Gallery.expandPerc;
                
            } else {
                
                this.elem.style.width = _Gallery.expandPerc;
                
            }
                
            var verticalSpace = containerHeight - this.elem.clientHeight;
            var verticalMargin = Math.floor( verticalSpace / 2 );

            this.elem.style.top = verticalMargin + 'px';

            var horizontalSpace = containerWidth - this.elem.clientWidth;
            var horizontalMargin = Math.floor( horizontalSpace / 2 );

            this.elem.style.left = horizontalMargin + 'px';
            
            this.elem.style.opacity = 1;
            
        };
        
        this.elem.onload = function(){
            
            _DisplayImage.align();
            
        };
        
        this.destroy = function() {
            
            window.addEventListener( 'resize', this, false );
            this.elem.removeEventListener( 'click', _Gallery, false );
            this.elem.parentElement.removeChild( this.elem );
            _DisplayImage = null;
            
        };
        
    };
    
    var NextButton = function() {
        
        if ( _Gallery.pointersStatus === 0 ) { return null; }
        
        var _NextButton = this;
        this.elem = document.createElement("DIV");
        this.elem.setAttribute( 'id', _Gallery.nextButtonId );
        this.elem.innerHTML = _Gallery.nextButtonText;
        _Gallery.wrapper.elem.appendChild( this.elem );
        
        this.elem.addEventListener( 'click', this, false );
        
        this.handleEvent = function( event ) {
            
            _Gallery.nextImage();
            
        };
        
        this.destroy = function() {
            
            this.elem.removeEventListener( 'click', this, false );
            this.elem.parentElement.removeChild( this.elem );
            _NextButton = null;
            
        };
        
    };
    
    var PrevButton = function() {
        
        if ( _Gallery.pointersStatus === 0 ) { return null; }
        
        var _PrevButton = this;
        this.elem = document.createElement("DIV");
        this.elem.setAttribute( 'id', _Gallery.prevButtonId );
        this.elem.innerHTML = _Gallery.prevButtonText;
        _Gallery.wrapper.elem.appendChild( this.elem );
        
        this.elem.addEventListener( 'click', this, false );
        
        this.handleEvent = function( event ) {
            
            _Gallery.prevImage();
            
        };
        
        this.destroy = function() {
            
            this.elem.removeEventListener( 'click', this, false );
            this.elem.parentElement.removeChild( this.elem );
            _PrevButton = null;
            
        };
        
    };
    
    var CloseButton = function() {
        
        if ( _Gallery.closeStatus === 0 ) { return null; }
        
        var _CloseButton = this;
        this.elem = document.createElement("DIV");
        this.elem.setAttribute( 'id', _Gallery.closeButtonId );
        this.elem.innerHTML = _Gallery.closeButtonText;
        _Gallery.wrapper.elem.appendChild( this.elem );
        
        this.elem.addEventListener( 'click', this, false );
        
        this.handleEvent = function( event ) {
            
            _Gallery.destroy();
            
        };
        
        this.destroy = function() {
            
            this.elem.removeEventListener( 'click', this, false );
            this.elem.parentElement.removeChild( this.elem );
            _CloseButton = null;
            
        };
        
    };
    
    var Pointer = function() {
        
        this.createHtml = function() {
            
            if ( _Gallery.counterStatus === 0 ) { return null; }
            
            _Pointer.elem = document.createElement("DIV");
            _Pointer.elem.setAttribute( 'id', 'galleryPointerButton' );
            _Gallery.wrapper.elem.appendChild( _Pointer.elem );
            
        };
        
        this.update = function() {
            
            if ( _Gallery.counterStatus === 0 ) { return null; }
            
            var sum = _Gallery.sources.length;
            
            this.elem.innerHTML = (_Gallery.currentPointer + 1) + '/' + sum;
            
        };
        
        var _Pointer = this;
        this.elem = null;
        
        _Gallery.currentPointer = _Gallery.sources.indexOf( _Gallery.displayImage.elem.src );
        
        this.createHtml();
        
        this.update();
        
        this.destroy = function() {
            
            if ( this.elem !== null ) {
                
                this.elem.parentElement.removeChild( this.elem );
                
            }
            
            _Pointer = null;
            
        };
        
    };
    
    var FullscreenButton = function() {
        
        if ( _Gallery.fullscreenStatus === 0 ) { return null; }
        
        var _FullscreenButton = this;
        this.elem = document.createElement("DIV");
        this.elem.setAttribute( 'id', _Gallery.fullscreenButtonId );
        this.elem.innerHTML = _Gallery.fullscreenDownButtonText;
        _Gallery.wrapper.elem.appendChild( this.elem );
        
        this.elem.addEventListener( 'click', this, false );
        
        this.handleEvent = function( event ) {
            
            if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {
                
                _FullscreenButton.elem.innerHTML = _Gallery.fullscreenUpButtonText;
                
                if ( _Gallery.wrapper.elem.requestFullscreen ) {
                    _Gallery.wrapper.elem.requestFullscreen();
                } else if (_Gallery.wrapper.elem.msRequestFullscreen) {
                    _Gallery.wrapper.elem.msRequestFullscreen();
                } else if (_Gallery.wrapper.elem.mozRequestFullScreen) {
                    _Gallery.wrapper.elem.mozRequestFullScreen();
                } else if (_Gallery.wrapper.elem.webkitRequestFullscreen) {
                    _Gallery.wrapper.elem.webkitRequestFullscreen();
                }
                
            } else {
                
                _FullscreenButton.elem.innerHTML = _Gallery.fullscreenDownButtonText;
                
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
                
            }
            
        };
        
        this.destroy = function() {
            
            this.elem.removeEventListener( 'click', this, false );
            this.elem.parentElement.removeChild( this.elem );
            _FullscreenButton = null;
            
        };
        
    };
    
    var SlideshowButton = function() {
        
        if ( _Gallery.slideshowStatus === 0 ) { return null; }
        
        var _SlideshowButton = this;
        this.elem = document.createElement("DIV");
        this.elem.setAttribute( 'id', _Gallery.slideshowButtonId );
        this.elem.setAttribute( 'title', 'Slideshow' );
        this.elem.innerHTML = _Gallery.slideshowPlayButtonText;
        _Gallery.wrapper.elem.appendChild( this.elem );
        this.timer = null;
        
        this.elem.addEventListener( 'click', this, false );
        
        this.handleEvent = function( event ) {
            
            if ( _SlideshowButton.timer === null ) {
            
                _SlideshowButton.timer = setInterval( _Gallery.nextImage, 2000 );
                _SlideshowButton.elem.innerHTML = _Gallery.slideshowPauseButtonText;
                
            } else {
                
                clearInterval( _SlideshowButton.timer );
                _SlideshowButton.timer = null;
                _SlideshowButton.elem.innerHTML = _Gallery.slideshowPlayButtonText;
                
            }
            
        };
        
        this.destroy = function() {
            
            this.elem.removeEventListener( 'click', this, false );
            clearInterval( _SlideshowButton.timer );
            this.elem.parentElement.removeChild( this.elem );
            _SlideshowButton = null;
            
        };
        
    };
    
    var Caption = function( img ) {
        
        this.assign = function() {
            
            if ( _Gallery.captionStatus === 0 ) { return null; }
            console.log( _Gallery.currentPointer );
            console.log( _Gallery.alts );
            _Caption.elem.innerHTML = _Gallery.alts[ _Gallery.currentPointer ];
            
        };
        
        var _Caption = this;
        this.elem = document.createElement("DIV");
        this.elem.setAttribute( 'id', _Gallery.captionElemId );
        _Gallery.wrapper.elem.appendChild( this.elem );
        
        this.assign();
        
        this.destroy = function() {
            
            this.elem.parentElement.removeChild( this.elem );
            _Caption = null;
            
        };
        
    };
    
}
