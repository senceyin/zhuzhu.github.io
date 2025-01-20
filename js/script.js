const { createApp } = Vue;

// 创建 Vue 应用实例
createApp({
    data() {
        return {
            showPasswordDialog: true,  // 控制口令框显示
            passwordInput: '',         // 用户输入的口令
            passwordError: false,      // 口令错误提示
            isMessageVisible: false,   // 控制生日祝福框显示

            query: '', // 搜索框中的用户输入
            alertMessage: '', // 当前提示框显示的消息
            alertQueue: [], // 提示消息的队列，用于处理多个连续的提示
            alertTimer: null,
            // alertVisible: false, // 控制提示框的显示状态
            isSearcButtonClick: false, // 增加按钮点击状态
            isDaysCardVisible: false, // 天数统计卡片显示状态
            startDate: new Date("2023-09-17"), // 起始日期
            suggestionsMapping: [ // 预设的搜索建议列表
                '猪猪可以上班吗',
                '猪猪是小肥奴吗',
                '猪猪最喜欢的是肥肥',
                '猪猪表情包合集',
                '猪猪最爱的是肥还是牛还是🥚！',
                '肥肥和猪猪的故事'

            ],
            searchMapping: { // 搜索关键词与对应跳转页面的映射
                '猪猪可以上班吗': 'pigpigwork.html',
                '猪猪是小肥奴吗': 'pig-slave.html',
                '猪猪最喜欢的是肥肥': 'pig-love-who-first.html',
                '猪猪表情包合集': 'pig-memes.html',
                '猪猪最爱的是肥还是牛还是🥚！': 'pig-love-who-first.html',
                '小猪在哪里？': 'little-pig-location.html',
                '小猪的最爱是什么？': 'ittle-pig-love.html',
                '肥肥是最可爱的！': 'fatfat-cute.html',
                '肥肥和猪猪的故事': 'fatfat-and-pig-story.html',
                '肥肥最喜欢的颜色是什么？': 'fatfat-color.html',
                'nono猪 猪猪！': 'nono-pig.html'
            }
        };
    },

    created() {
        // 页面加载时检查是否已经通过口令验证
        if (localStorage.getItem('isPasswordChecked') === 'true') {
            this.showPasswordDialog = false;  // 如果通过口令验证，关闭口令框
        }

    },
    computed: {
        // 计算属性：根据用户输入动态过滤建议列表
        filteredSuggestions() {
            const query = this.query?.trim().toLowerCase(); // 去掉输入两端的空格并转换为小写
            if (!query) return []; // 如果输入为空，返回空数组
            // 返回与输入匹配的建议列表（模糊匹配）
            return this.suggestionsMapping.filter(item =>
                item.toLowerCase().includes(query)
            );
        }
    },
    methods: {

        closeMessage() {
            this.isMessageVisible = false; // 关闭消息
        },

        handleAnimationEnd(event) {
            // 检查是否是 fadeOut 动画结束
            if (event.animationName === "fadeOut") {
                this.isMessageVisible = false; // 隐藏消息
                console.log("FadeOut animation completed. Message hidden.");
            }
        },

        // 输入框聚焦时触发
        handleFocus() {
            // debugger
            // 如果输入框为空，则显示一个提示消息
            if (!this.query?.trim()) {
                this.showAlert('🐷 试试输入 "猪猪"');
            }
        },
        // 高亮匹配的部分（在下拉建议中标记匹配内容）
        highlightMatch(item) {
            const query = this.query?.trim(); // 用户输入的内容
            if (!query) return item; // 如果没有输入，直接返回原始内容
            // 转义正则表达式中的特殊字符，避免错误
            const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(escapedQuery, 'gi'); // 全局匹配且不区分大小写
            // 将匹配的部分用 <span> 包裹，便于高亮显示
            return item.replace(regex, match => `<span class="highlight">${match}</span>`);
        },
        // 选择建议项后，将内容填入搜索框
        selectSuggestion(suggestion) {
            this.query = suggestion; // 更新搜索框的值为选择的建议
        },
        // 按下回车键时触发
        handleEnter() {
            this.handlePigSearch()
        },
        showAlert(message) {
            console.log('Message pushed to queue:', message);
            console.log('Queue before push:', this.alertQueue);
            this.alertQueue.push(message);
            console.log('Queue after push:', this.alertQueue);
            this.startProcessingQueue();
        },

        startProcessingQueue() {
            // 如果正在处理队列，就直接返回，避免重复处理\
            console.log('alertTimer:', this.alertTimer);
            this.processAlertQueue(); // 开始处理队列
        },

        processAlertQueue() {
            if (!this.alertQueue.length) return;

            this.alertMessage = this.alertQueue.shift(); // 更新显示的消息
            console.log('Alert message updated:', this.alertMessage);
            this.$forceUpdate();
            this.alertTimer = setTimeout(() => {
                this.alertMessage = ''; // 清空消息
                console.log('Alert message cleared after 2 seconds');
            }, 3500);
        },

        // 点击“猪猪搜索”按钮触发
        handlePigSearch() {
            this.isSearcButtonClick = true; // 标记按钮已被点击
            setTimeout(() => {
                this.isSearcButtonClick = false; // 1 秒后重置按钮状态
            }, 2000);
            if (!this.query?.trim()) {
                this.showAlert('🐷 请先输入内容！'); // 如果输入框为空，显示提示消息
                return;
            }
            if (this.searchMapping[this.query]) {
                // 如果输入内容匹配映射表中的某项，跳转到对应页面
                window.location.href = this.searchMapping[this.query];
            } else {
                // 否则提示未找到相关结果
                this.showAlert('🐷 没有找到相关结果，请检查输入内容！');
            }
        },

        clearPasswordStatus() {
            localStorage.removeItem('isPasswordChecked');
        },


        checkPassword() {
            const correctPassword = '就想和你玩';  // 正确口令
            if (this.passwordInput === correctPassword) {
                // 输入正确，隐藏口令框并显示生日祝福框
                this.showPasswordDialog = false;
                buttonApp.isGifButtonVisible = true;
                this.isMessageVisible = true;  // 显示生日祝福框
                this.passwordError = false;   // 清除错误提示
                localStorage.setItem('isPasswordChecked', 'true');
            } else {
                // 输入错误，显示错误提示
                this.passwordError = true;
            }
        },

        // 点击“普通搜索”按钮触发
        handleNormalSearch() {
            this.isSearcButtonClick = true;
            setTimeout(() => {
                this.isSearcButtonClick = false;
            }, 2000);

            if (!this.query?.trim()) {
                this.showAlert('🐷 请先输入内容再进行普通搜索！'); // 如果输入框为空，显示提示消息
                return;
            }
            // 打开百度搜索，并传递用户的搜索内容
            const baiduSearchUrl = `https://www.baidu.com/s?wd=${encodeURIComponent(this.query)}`;
            window.open(baiduSearchUrl, '_blank'); // 在新标签页打开百度搜索
        }

    }
}).mount('#app'); // 挂载到页面上的 #app 容器
// 创建 Vue 应用实例 2 (管理按钮和天数卡片)

const buttonApp = createApp({
    data() {
        return {
            isDaysCardVisible: false,
            isGifButtonVisible: false,
            startDate: new Date("2023-09-17"),
        };
    },
    methods: {
        toggleDaysCard() {
            this.isDaysCardVisible = !this.isDaysCardVisible;
        },
        calculateDaysTogether() {
            const now = new Date();
            return Math.floor((now - this.startDate) / (1000 * 60 * 60 * 24));
        }
    }
}).mount('#button-container'); // 挂载到页面上的 #button-container 容器


