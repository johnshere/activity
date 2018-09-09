const Dialog = (function(win,doc){
    window.addEventListener('load',function(){document.body.addEventListener('touchstart',function(){},false); },false);
    class DialogFn{
        constructor(obj) {
            this.timer = null;
            this.set = {};
        }
        extend (n,n1){ 
            for(let i in n1){n[i] = n1[i]};
        }
        init(a,b,c){
            if(b && typeof b === 'object') this.extend(this.set,b);
            let _dialog = document.createElement('div'),
            item = document.createElement('div'),
            t = this,set = t.set;
            _dialog.classList.add('c_alert_dialog');
            if(set.index) _dialog.dataset.index = set.index
            item.classList.add('c_alert_wrap');
            item.innerHTML = `<div class="c_alert_con" style="${set.style}">${a}</div>`;
            set.addClass && item.classList.add(set.addClass)
            if(set.title) {
                item.classList.add('c_alert_width');
                item.insertAdjacentHTML("afterbegin", `<div class="c_alert_title">${b.title}</div>`);
            }
            if(set.button) {
                item.classList.add('c_alert_width');
                let _btn = ''
                for(let i in set.button){
                    _btn+=`<a href="javascript:;" data-name="${i}">${i}</a>`
                };
                item.insertAdjacentHTML("beforeend", `<div class="c_alert_btn">${_btn}</div>`);
                let btnArr = item.querySelectorAll('.c_alert_btn a');
                ;[].forEach.call(btnArr,o =>{
                    //o.style.width = 100 / btnArr.length + '%'
                    o.onclick = function(e){
                        e.preventDefault();
                        set.button[o.dataset.name].call(item,t);
                    }
                })
            }; 
            if(set.time) 
                t.timer = setTimeout(()=>{_D_obj.close(item,set.after)},set.time+300)
            if(b && typeof b !== 'object') 
                t.timer = setTimeout(()=>{_D_obj.close(item,set.after)},b+300)
            set.before && set.before.call(item);
            if(set.mask===undefined || set.mask){
                _dialog.insertAdjacentHTML("beforeend","<div class='c_alert_mask'  ontouchmove='return false'></div>");
            };
            _dialog.appendChild(item);
            document.body.appendChild(_dialog)
            if(set.mask=== undefined || set.mask){
                _dialog.querySelector('.c_alert_mask').onclick =(e)=>{
                    e.preventDefault();
                    if(set.maskClick || set.maskClick===undefined) _D_obj.close(item,set.after) ;
                };
            };
            set.onload && set.onload.call(item)
            setTimeout(()=>{_dialog.classList.add('dialog_open')},50)
        }
    };
    window._D_obj = {
        init : function(a,b,c){
            new DialogFn().init(a,b,c);
        },
        close : function(index,fn) {
            let _dialog = document.querySelectorAll('.c_alert_dialog');
            ;[].forEach.call(_dialog,o =>{
                if(o.dataset.index == index || o === index.parentNode){
                    o.classList.remove('dialog_open')
                    o.classList.add('dialog_close');
                    fn && fn.call(o.querySelector('.c_alert_wrap'),index)
                    o.querySelector('.c_alert_wrap').addEventListener('animationend', function(){
                        o.remove();
                    });
                }
            })
        }
    };
    return _D_obj;
})(window,document);