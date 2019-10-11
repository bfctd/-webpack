$.fn.extend({
    formRuleTest: function (option) {
        let item = option.set
        var role = {
            phone: /^1\d{10}$/,
            code: /^\d{6}$/,
            icord: /^\d{17}X|x|\d$/,
            email: /.+@.+\.[a-z]+/,
            mast: /\S+/,
            int: /^[1-9]\d*$/
        }
        var isTrue = {}

        function eachOption(that, all) {
            item.forEach((i) => {
                var el = that.find(i.el)
                var afterEl = $('<div>').attr('class', 'form-rule-after-el')
                var text = i.text || '您输入的不正确'

                // this指向jquery对象，init
                el.on(i.event, () => {
                    goTestErr(i, el, afterEl, text, that)
                })
                if (all) {
                    goTestErr(i, el, afterEl, text, that)
                }
            })
        }

        eachOption(this, false)

        function goTestErr(i, el, afterEl, text, that) {
            var reg = eval(i.regexp) || role[i.role]
            var err;
            err = reg.test(el.val()) //正则匹配是否正确

            isTrue[(i.el).replace(/\./g, '_')] = reg.test(that.find(i.el).val())
            if (err) {
                //匹配成功
                el.css({border: '1px solid green'})
                if (el.next('div.form-rule-after-el')[0]) {
                    el.next('div.form-rule-after-el').hide()
                }
            } else {
                //匹配失败
                if (!el.next('div.form-rule-after-el')[0]) {
                    el.after(afterEl)
                }
                el.css({border: '1px solid red'})
                if (i.show === 'bottom') {
                    el.next().text(text).css({display: 'block', fontSize: '1px', color: 'red'}).show()
                }
            }
        }

        if (option.allTest) {
            let isTrueArr = []
            var noAccess
            eachOption(this, true)
            for (var allIsTrue in isTrue) {
                isTrueArr.push(isTrue[allIsTrue])
            }
            noAccess= isTrueArr.indexOf(false)
            if (noAccess !== -1) {
                console.log('no')
                return false
            } else {
                console.log('yes,can access')
                return true
            }
        }
    }
})