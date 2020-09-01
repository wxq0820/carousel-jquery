$(function () {
    function carousel($ct) {

        this.init($ct)
        this.bind()
        this.autoPlay()
    }
    carousel.prototype = {
        init: function ($ct) {

            this.$ct = $ct
            this.$img_ct = this.$ct.find('.img-ct')
            this.imgs = this.$ct.find('.img-ct > li')
            this.$left = this.$ct.find('.left')
            this.$right = this.$ct.find('.right')
            this.$dots = this.$ct.find('.dots')
            
            this.imgsCount = this.imgs.length
            this.index = 0
            this.isAnimate = false
            this.timeClock = null

            this.$img_ct.append(this.imgs.first().clone())
            this.$img_ct.prepend(this.imgs.last().clone())

            this.imgWidth = this.$ct.find('img').width()
            this.$img_ct.css('width', this.imgWidth * (this.imgsCount + 2))
            this.$img_ct.css('left', -this.imgWidth)

        },
        bind: function () {
            var that = this
            this.$left.on('click', function () {
                that.preImg(1)
            })
            this.$right.on('click', function () {
                that.nextImg(1)
            })
            this.$dots.on('click', 'li', function () {
                if(that.index > $(this).index()){
                    that.preImg(that.index - $(this).index())
                }else{
                    that.nextImg($(this).index() - that.index)
                }
            })
            this.$ct.on('mouseover',function(){
                that.stopPlay()
            })
            this.$ct.on('mouseout',function(){
                that.autoPlay()
            })
        },
        preImg: function (step) {
            var that = this
            if (this.isAnimate) return
            this.isAnimate = true
            this.$img_ct.animate({
                left: '+=' + that.imgWidth * step
            }, function () {
                that.index -= step
                if (that.index < 0) {
                    that.$img_ct.css('left', -(that.imgWidth * that.imgsCount))
                    that.index = that.imgsCount - 1
                }
                that.$dots.find('li').eq(that.index)
                                     .addClass('active')
                                     .siblings().removeClass('active')
                that.isAnimate = false
            })
        },
        nextImg: function (step) {
            var that = this
            if (this.isAnimate) return
            this.isAnimate = true
            this.$img_ct.animate({
                left: '-=' + that.imgWidth * step
            }, function () {
                that.index += step
                 if (that.index === that.imgsCount) {
                    that.$img_ct.css('left', -that.imgWidth)
                    that.index = 0
                }
                that.$dots.find('li').eq(that.index)
                                     .addClass('active')
                                     .siblings().removeClass('active')
                that.isAnimate = false
            })
        },
        autoPlay: function(){
            var that = this
            that.timeClock = setInterval(function(){
                that.nextImg(1)
            },2000)
        },
        stopPlay: function(){
            clearInterval(this.timeClock)
        }
    }

    new carousel($('.carousel').eq(0))
    new carousel($('.carousel').eq(1))
    new carousel($('.carousel').eq(2))
})