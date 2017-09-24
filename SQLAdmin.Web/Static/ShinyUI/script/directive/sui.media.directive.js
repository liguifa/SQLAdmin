angular.module("shinyui.media",[])

.directive("suiVideo",function(){
    var vm = {
        template:"<div class='sui-video' style='height:{{vm.height}}px;width:{{vm.width}}px' allowfullscreen=‘’>\
                    <video class='sui-video-item' src='{{vm.src}}' preload autoplay height='{{vm.height-68}}px' width='100%' poster='http://img3.3lian.com/2013/s2/60/d/92.jpg'>\</video>\
                    <div class='sui-video-controls'>\
                        <ul class='sui-video-controls-list'>\
                            <li class='sui-video-controls-list-item sui-video-controls-list-item-hover'>\
                                <i class='sui-icon sui-video-controls-list-item-play' ng-click='vm.play()' ng-if='vm.isPlay'>&#xe871;</i>\
                                <i class='sui-icon sui-video-controls-list-item-play' ng-click='vm.play()' ng-if='!vm.isPlay'>&#xe86e;</i>\
                            </li>\
                            <li class='sui-video-controls-list-item'>\
                                <div class='sui-video-controls-list-item-progress' style='width:{{vm.width-261}}px;'>\
                                    <div class='sui-video-controls-list-item-progress-line' style='width:{{vm.width-312}}px;'>\
                                        <div class='sui-video-controls-list-item-progress-line-load' style='width:{{vm.buffered_progress}}%;'></div>\
                                        <div class='sui-video-controls-list-item-progress-line-load-play' style='width:{{vm.paly_progress}}%;'></div>\
                                        <div class='sui-video-controls-list-item-progress-line-dot' style='left:{{vm.paly_progress}}%;'></div>\
                                    </div>\
                                    <span class='sui-video-controls-list-item-progress-time'>{{vm.currentTime | time}}/{{vm.duration | time}}</span>\
                                </div>\
                                <div class='sui-clear'></div>\
                            </li>\
                            <li class='sui-video-controls-list-item sui-video-controls-list-item-hover sui-video-controls-list-item-volume'>\
                                <i class='sui-icon sui-video-controls-list-item-volume-icon' ng-click='vm.showVolume()'>&#xe84e;</i>\
                                <div class='sui-video-controls-list-item-volume-control' ng-if='vm.isShowVolume'>\
                                    <div class='sui-video-controls-list-item-volume-control-number'><span>{{vm.volume}}</span></div>\
                                    <sui-slider class='sui-video-controls-list-item-volume-control-progress' direction='\"vertical\"' value='vm.volume'  min='0' max='100' type='\"int\"'></sui-slider>\
                                </div>\
                            </li>\
                            <li class='sui-video-controls-list-item sui-video-controls-list-item-hover'>\
                                <span class='sui-video-controls-list-item-clarity'>{{vm.clarity}}</span>\
                            </li>\
                            <li class='sui-video-controls-list-item sui-video-controls-list-item-hover'>\
                                <i ng-click='vm.download()' class='sui-icon sui-video-controls-list-item-download'>&#xe832;</i>\
                            </li>\
                            <li class='sui-video-controls-list-item sui-video-controls-list-item-hover'>\
                                <i ng-click='vm.full()' class='sui-icon sui-video-controls-list-item-full'>&#xe852;</i>\
                            </li>\
                        </ul>\
                    </div>\
                    <div class='sui-video-barrage'>\
                        <ul class='sui-video-barrage-list sui-video-barrage-list'>\
                            <li class='sui-video-barrage-list-item sui-video-barrage-list-item-hover' ng-click='vm.showBarrageSetting()'>\
                                <i class='sui-icon'>&#xe845;</i>\
                            </li>\
                            <li class='sui-video-barrage-list-item sui-video-barrage-list-item-hover' ng-click='vm.showBarrageColor()'>\
                                <i class='sui-icon'>&#xf0eb;</i>\
                            </li>\
                            <li class='sui-video-barrage-list-item sui-video-barrage-list-item-text' style='width:{{vm.width-180}}px;'>\
                                <i class='sui-icon'>&#xf120;</i>\
                                <input type='text' ng-model='vm.inputBarrage' class='sui-video-barrage-list-item-text-input' style='width:{{vm.width-238}}px;' />\
                            </li>\
                            <li class='sui-video-barrage-list-item'>\
                                <button class='sui-video-barrage-list-item-send' ng-click='vm.send()'>发送</button>\
                            </li>\
                        </ul>\
                    </div>\
                    <div class='sui-video-subtitle'><span>{{vm.currentSubTitle}}</span></div>\
                    <div ng-if='vm.isShowBarrage' class='sui-video-barrage-pool' style='bottom:{{vm.height}}px;height:{{vm.height-68}}px;'>\
                        <div ng-repeat='item in vm.barrages' class='sui-video-barrage-pool-text' style='left:{{item.left}}px;top:{{item.top}}px;color:{{item.color}};font-size:{{vm.barrageSize}}px;opacity:{{vm.barrageOpacity/100}}'>{{item.text}}</div>\
                    </div>\
                    <div class='sui-video-barrage-setting' ng-if='vm.isShowBarrageSetting'>\
                        <ul class='sui-video-barrage-setting-list'>\
                            <li class='sui-video-barrage-setting-list-item'><span><label>显示弹幕</label><sui-switch class='sui-video-barrage-setting-toggle' value='vm.isShowBarrage' true-text='\"开\"' false-text='\"关\"'></sui-switch></span></li>\
                            <li class='sui-video-barrage-setting-list-item'><span><label>透&nbsp;&nbsp;明&nbsp;&nbsp;度</label><sui-slider value='vm.barrageOpacity' min='0' max='100' type='\"int\"'></sui-slider><span class='sui-video-barrage-setting-list-item-value'>{{vm.barrageOpacity}}%</span></li>\
                            <li class='sui-video-barrage-setting-list-item'><span><label>字&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</label><sui-slider value='vm.barrageSize'  min='1' max='32' type='\"int\"'></sui-slider><span class='sui-video-barrage-setting-list-item-value'>{{vm.barrageSize}}</span></li>\
                            <li class='sui-video-barrage-setting-list-item'><span><label>速&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度</label><sui-slider value='vm.barrageSpeech'  min='1' max='30' type='\"int\"'></sui-slider><span class='sui-video-barrage-setting-list-item-value'>{{vm.barrageSpeech}}秒</span></li>\
                            <li class='sui-video-barrage-setting-list-item'><span><label>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;度</label><sui-slider value='vm.barrageCount'  min='1' max='20' type='\"int\"'></sui-slider><span class='sui-video-barrage-setting-list-item-value'>{{vm.barrageCount}}条</span></li>\
                        </ul>\
                    </div>\
                    <div class='sui-video-barrage-color' ng-if='vm.isShowBarrageColor'>\
                        <div class='sui-video-barrage-color-list-title'><span>弹幕颜色</span></div>\
                        <ul class='sui-video-barrage-color-list'>\
                            <li class='sui-video-barrage-color-list-item' ng-class='{\"sui-video-barrage-color-list-item-active\":color==vm.currentColor}' ng-repeat='color in vm.barrageColors'>\
                                <div class='sui-video-barrage-color-list-item-dot' ng-click='vm.setBarrageColor(color)' style='background:{{color}};'></div>\
                            </li>\
                        </ul>\
                    </div>\
                    <div class='sui-clear'></div>\
                  </div>",
        
    }
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        transclude:true,
        scope: {
            src:"=",
            autoplay:"=",
            volume:"=",
            subTitles:"=",
            barrages:"=",
            sendbarrage:"&"
        },
        controller:function($scope){
            $scope.vm = {
                video:null, 
                duration:0,
                paly_progress:0,
                currentTime:0,
                buffered_progress:0,
                isPlay:true,
                volume:0,
                clarity:"自动",
                height:500,
                width:660,
                isFull:false,
                oldSize:{width:660,height:500},
                isShowVolume:false,
                currentSubTitle:"飞鸟尽、良弓藏、狡兔死、走狗烹",
                obsoleteSubTitles:[],
                queueSubTitles:[],
                src:"",
                hideSubTitle:null,
                isStartSetVolume:false,
                startVolumeY:0,
                barrages:[],
                queueBarrages:[],
                isShowBarrageSetting:false,
                barrageOpacity:0,
                barrageSize:24,
                barrageSpeech:10,
                barrageCount:10,
                isShowBarrage:true,
                isShowBarrageColor:false,
                barrageColors:["#006633","#006699","#009966","#00CCCC","#330033","#333333","#660000","#99FF00","#CC6699","#CC9900","#CCFFFF","#FF3333","#FF9999","#FF99CC","#99CC66","#666666","#CCCCCC","#339933","#FF6600","#66CC00","#ffffff"],
                currentColor:"#ffffff",
                showBarrageSetting:function(){
                    $scope.vm.isShowBarrageSetting = !$scope.vm.isShowBarrageSetting;
                },
                play:function(){
                    if($scope.vm.isPlay){
                        $scope.vm.video.pause();
                        $scope.vm.isPlay = false;
                    } else  {
                        $scope.vm.video.play();
                        $scope.vm.isPlay = true;
                    }
                },
                timeupdate:function(){
                    $scope.$apply(function(){
                        $scope.vm.paly_progress = ($scope.vm.video.currentTime/$scope.vm.duration)*100;
                        $scope.vm.currentTime = $scope.vm.video.currentTime;
                        var firstSubTitle = $scope.vm.queueSubTitles[0];
                        if(firstSubTitle.time <= $scope.vm.currentTime){
                            $scope.vm.currentSubTitle = firstSubTitle.title;
                            $scope.vm.queueSubTitles.splice(0,1);
                            if($scope.vm.hideSubTitle != null){
                                clearTimeout($scope.vm.hideSubTitle);
                            }
                            $scope.vm.hideSubTitle = window.setTimeout(function(){
                                $scope.$apply(function(){
                                    $scope.vm.currentSubTitle = "";
                                });
                            },3000);
                        }
                        // $scope.vm.moveBarrages();
                        $scope.vm.dispatchBarrages();
                    });
                },
                loadedmetadata:function(){
                    $scope.vm.duration = $scope.vm.video.duration
                },
                progress:function(){
                    $scope.$apply(function(){
                        var prload = $scope.vm.video.buffered;
                        var start = prload.start(0);
                        var end = prload.end(0);
                        $scope.vm.buffered_progress = end/$scope.vm.duration * 100;
                    });
                },
                full:function(){
                    if(!$scope.vm.isFull){
                        $scope.vm.video.parentElement.webkitRequestFullScreen();
                    } else {
                        document.webkitCancelFullScreen(); 
                    }
                },
                download:function(){
                    window.location.href = $scope.vm.src;
                },
                showVolume:function(){
                    $scope.vm.isShowVolume = !$scope.vm.isShowVolume ;
                },
                startSetVolume:function($event){
                    $scope.vm.isStartSetVolume = true;
                    $scope.vm.startVolumeY = $event.clientY;
                },
                endSetVolume:function(){
                    $scope.vm.isStartSetVolumn = false;
                },
                setVolume:function($event){
                    if($scope.vm.isStartSetVolume){
                        var y = $event.clientY - $scope.vm.startVolumeY;
                        $scope.vm.volume += 0-y;
                    }
                },
                moveBarrages:function(){
                    window.setInterval(function(){
                        $scope.$apply(function(){
                            var tempBarrages = [];
                            $scope.vm.barrages.forEach(function(item) {
                                var addLeft = 1;
                                item.left -= addLeft;
                                if(item.left > 0 - item.text.length * 16 - 4){
                                    tempBarrages.push(item);
                                }
                            }, this);
                            $scope.vm.barrages = tempBarrages;
                        });
                    },$scope.vm.barrageSpeech);
                },
                dispatchBarrages:function(){
                    var firstBarrage = $scope.vm.queueBarrages[0];
                    if(firstBarrage.time <= $scope.vm.currentTime){
                        for(var i=0,top=10;i<$scope.vm.barrageCount;i++){
                            var currentBarrages = $scope.vm.barrages.filter(function(item){
                                return item.top == top + i*30;
                            }).sort(function(item1,item2){
                                return 0-(item1.left - item2.left);
                            });
                            if(currentBarrages.length == 0){
                                firstBarrage.top = top + i*30;
                                firstBarrage.left = $scope.vm.width;
                                $scope.vm.queueBarrages.splice(0,1);
                                $scope.vm.barrages.push(firstBarrage);
                                break;
                            } else {
                                var lastBarrage = currentBarrages[0];
                                if(lastBarrage.left + lastBarrage.text.length * 25 + 5 < $scope.vm.width){
                                    firstBarrage.top = top + i*30;
                                    firstBarrage.left = $scope.vm.width;
                                    $scope.vm.queueBarrages.splice(0,1);
                                    $scope.vm.barrages.push(firstBarrage);
                                    break;
                                }
                            }
                        }
                        $scope.vm.dispatchBarrages();
                    }
                },
                send:function(){
                    if($scope.vm.inputBarrage!=""){
                        var barrage = {
                            time:$scope.vm.currentTime,
                            text:$scope.vm.inputBarrage,
                            color:$scope.vm.currentColor,
                        }
                        $scope.vm.queueBarrages.unshift(barrage);
                        $scope.sendbarrage({barrage:barrage});
                        $scope.vm.inputBarrage = "";
                    }
                },
                showBarrageColor:function(){
                    $scope.vm.isShowBarrageColor = !$scope.vm.isShowBarrageColor;
                },
                setBarrageColor:function(color){
                    $scope.vm.currentColor = color;
                }
            }
            $scope.$watch("volume",function(volume){
                if(volume){
                    volume = parseInt(volume);
                    if(volume<0){
                        volume = 0
                    }
                    if(volume>100){
                        volume = 100;
                    }
                    $scope.vm.volume = volume;
                }
            });
            $scope.$watch("subTitles",function(subTitles){
                subTitles.sort(function(item1,item2){
                    return item1.time - item2.time;
                });
                $scope.vm.obsoleteSubTitles = [];
                $scope.vm.queueSubTitles = [];
                var tempSubTitles = subTitles;
                for(var i in subTitles){
                    if(subTitles[i].time>=$scope.vm.currentTime){
                        break;
                    }
                    $scope.vm.obsoleteSubTitles.push(subTitles[i]);
                    tempSubTitles.splice(i, 1);
                }
                $scope.vm.queueSubTitles = tempSubTitles;
            },true);
            $scope.$watch("vm.volume",function(volume){
                $scope.vm.video.volume = volume/100;
            });
            $scope.$watch("src",function(src){
                $scope.vm.src = src;
            });
            $scope.$watch("barrages",function(barrages){
                $scope.vm.queueBarrages = barrages.sort(function(item1,item2){
                    return item1.time - item2.time;
                })
            });
            $scope.vm.moveBarrages();
        },
        link:function($scope,elements,attrs){
            var video = elements[0].children[0];
            $scope.vm.video = video;
            video.ontimeupdate = $scope.vm.timeupdate;
            video.onloadedmetadata = $scope.vm.loadedmetadata;
            video.onprogress = $scope.vm.progress;
            $scope.vm.volume = video.volume;
            document.onwebkitfullscreenchange = function( event ) {
                if(document.webkitFullscreenElement != null){
                        $scope.vm.height =  window.screen.height;
                        $scope.vm.width =  window.screen.width;
                        $scope.vm.isFull = true;
                    } else {
                        $scope.vm.height = $scope.vm.oldSize.height;
                        $scope.vm.width = $scope.vm.oldSize.width;
                        $scope.vm.isFull = false;
                    }
            }
        }
    }
})

.directive("suiAudio",function(){
    var vm = {
        template:"<div class='sui-audio' style='height:500px;width:400px;'>\
                    <audio class='sui-audio-item' src='{{vm.src}}' autoplay></audio>\
                    <div class='sui-audio-title' style='background:url(../../Images/10922980_064633.jpg);'>\
                        <i class='sui-icon sui-aduio-title-icon'>&#xe874;</i>\
                        <i class='sui-icon sui-aduio-title-icon' ng-click='vm.play()'>&#xe86e;</i>\
                        <i class='sui-icon sui-aduio-title-icon'>&#xe872;</i>\
                        <div class='sui-aduio-progress'></div>\
                        <div class='sui-aduio-progress-load' style='width:{{vm.buffered_progress}}%;'></div>\
                        <div class='sui-aduio-progress-play' style='width:{{vm.paly_progress}}%;'><div class='sui-aduio-progress-play-dot'></div>\</div>\
                    </div>\
                    <div class='sui-audio-tool'>\
                        <ul>\
                            <li><i class='sui-icon'>&#xf0c9;</i></li>\
                            <li><i class='sui-icon'>&#xf298;</i></li>\
                            <li><i class='sui-icon'>&#xf27a;</i></li>\
                        </ul>\
                    </div>\
                    <div class='sui-audio-subtitle' style='height:330px;'>\
                        <ul class='sui-audio-subtitle-list' style='top:{{vm.currentTop}}px;'>\
                            <li class='sui-audio-subtitle-list-item' ng-class='{\"sui-audio-subtitle-list-item-active\":item.isCurrent}' ng-repeat='item in vm.subtitles'>{{item.title}}</li>\
                        </ul>\
                    </div>\
                  </div>"
    }
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        transclude:true,
        scope: {
            src:"=",
            subtitles:"=",
        },
        controller:function($scope){
            $scope.vm = {
                src:"",
                subtitles:[],
                audio:null,
                volume:0,
                duration:0,
                buffered_progress:0,
                paly_progress:0,
                currentTime:0,
                currentTop:0,
                height:500,
                currentSubtitle:0,
                isPlay:true,
                timeupdate:function(){
                    $scope.$apply(function(){
                        $scope.vm.paly_progress = ($scope.vm.audio.currentTime/$scope.vm.duration)*100;
                        $scope.vm.currentTime = $scope.vm.audio.currentTime;
                        // var firstSubTitle = $scope.vm.queueSubTitles[0];
                        // if(firstSubTitle.time <= $scope.vm.currentTime){
                        //     $scope.vm.currentSubTitle = firstSubTitle.title;
                        //     $scope.vm.queueSubTitles.splice(0,1);
                        //     if($scope.vm.hideSubTitle != null){
                        //         clearTimeout($scope.vm.hideSubTitle);
                        //     }
                        //     $scope.vm.hideSubTitle = window.setTimeout(function(){
                        //         $scope.$apply(function(){
                        //             $scope.vm.currentSubTitle = "";
                        //         });
                        //     },3000);
                        // }
                        // // $scope.vm.moveBarrages();
                        // $scope.vm.dispatchBarrages();
                        $scope.vm.setCurrentSubtitle();
                    });
                },
                loadedmetadata:function(){
                    $scope.vm.duration = $scope.vm.audio.duration
                },
                progress:function(){
                    $scope.$apply(function(){
                        var prload = $scope.vm.audio.buffered;
                        var start = prload.start(0);
                        var end = prload.end(0);
                        $scope.vm.buffered_progress = end/$scope.vm.duration * 100;
                    });
                },
                setCurrentSubtitle:function(){
                    var startSubtitleCount = parseInt(((($scope.vm.height - 170)/38)+1)/2);
                    var next = $scope.vm.currentSubtitle + 1;
                    if($scope.vm.subtitles[next].time<$scope.vm.currentTime){
                        $scope.vm.subtitles[$scope.vm.currentSubtitle].isCurrent = false;
                        $scope.vm.subtitles[next].isCurrent = true;
                        if(next > startSubtitleCount){
                            $scope.vm.currentTop -= 34;
                        }
                        $scope.vm.currentSubtitle = next;
                    }
                },
                play:function(){
                    if($scope.vm.isPlay){
                        $scope.vm.audio.pause();
                    } else {
                        $scope.vm.audio.play();
                    }
                }
            }

            $scope.$watch("src",function(src){
                $scope.vm.src = src;
            });
            $scope.$watch("subtitles",function(subtitles){
                $scope.vm.subtitles = subtitles;
                $scope.vm.subtitles[0].isCurrent = true;
            });
        },
        link:function($scope,elements,attrs){
            var audio = elements[0].children[0];
            $scope.vm.audio = audio;
            audio.ontimeupdate = $scope.vm.timeupdate;
            audio.onloadedmetadata = $scope.vm.loadedmetadata;
            audio.onprogress = $scope.vm.progress;
            $scope.vm.volume = audio.volume;
        }
    }
})

.filter("time",function(){
    return function(input){
        if(input){
            var hour = parseInt(input/60/60);
            var newTime = input - (hour * 60 * 60);
            var minute = parseInt(newTime/60);
            var second = parseInt(newTime - minute*60);
            var returnValue  = '';
            if(hour < 10){
                returnValue += '0';
            }
            returnValue += hour + ":";
            if(minute < 10){
                returnValue += '0';
            }
            returnValue += minute + ":";
            if(second < 10){
                returnValue += '0';
            }
            returnValue += second;
            return returnValue;
        }
    }
})