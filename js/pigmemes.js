const { createApp } = Vue;


createApp({
    data() {
        return {
            gifs: [], // 存储所有GIF图片
            modalVisible: false, // 弹窗显示状态
            modalGif: null, // 当前放大的 GIF 图片
            page: 1, // 当前页
            gifsPerPage: 2000, // 每页显示的 GIF 数量
            loading: false, // 防止重复加载

        };
    },
    mounted() {
        // 加载初始 GIF 图片
        this.loadGifs();

        // 监听滚动事件来加载更多 GIF 图片
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        // 获取 GIF 图片的 URL 地址
        loadGifs() {
            const gifUrls = this.getGifUrls(); // 假设你有一个获取所有GIF图片的函数
            const startIndex = (this.page - 1) * this.gifsPerPage;
            const gifsToDisplay = gifUrls.slice(startIndex, startIndex + this.gifsPerPage);

            // 更新 GIF 图片列表
            gifsToDisplay.forEach((gif, index) => {
                this.gifs.push({
                    id: startIndex + index + 1,
                    name: `猪猪${startIndex + index + 1}`,
                    url: gif,
                });
            });
        },

        // 处理滚动加载更多 GIF 图片
        handleScroll() {
            if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 200) {
                // 如果用户滚动到页面底部，加载更多 GIF 图片
                this.page += 1;
                this.loadGifs();
            }
        },

        // 获取 GIF 图片的 URL（可以是动态加载的文件列表）
        getGifUrls() {
            return [
                'assets/pigmeme/1736754227364.gif',
                'assets/pigmeme/1736754227382.gif',
                'assets/pigmeme/1736754227397.gif',
                'assets/pigmeme/1736754227413.gif',
                'assets/pigmeme/1736754227432.gif',
                'assets/pigmeme/1736754227447.gif',
                'assets/pigmeme/1736754227463.gif',
                'assets/pigmeme/1736754227479.gif',
                'assets/pigmeme/1736754227495.gif',
                'assets/pigmeme/1736754227511.gif',
                'assets/pigmeme/1736754227527.gif',
                'assets/pigmeme/1736754227541.gif',
                'assets/pigmeme/1736754227556.gif',
                'assets/pigmeme/1736754227571.gif',
                'assets/pigmeme/1736754227594.gif',
                'assets/pigmeme/1736754227613.gif',
                'assets/pigmeme/1736754227630.gif',
                'assets/pigmeme/1736754227647.gif',
                'assets/pigmeme/1736754227663.gif',
                'assets/pigmeme/1736754227679.gif',
                'assets/pigmeme/1736754227696.gif',
                'assets/pigmeme/1736754227712.gif',
                'assets/pigmeme/1736754227727.gif',
                'assets/pigmeme/1736754227748.gif',
                'assets/pigmeme/1736754227764.gif',
                'assets/pigmeme/1736754227780.gif',
                'assets/pigmeme/1736754227796.gif',
                'assets/pigmeme/1736754227816.gif',
                'assets/pigmeme/1736754227833.gif',
                'assets/pigmeme/1736754227850.gif',
                'assets/pigmeme/1736754227867.gif',
                'assets/pigmeme/1736754227883.gif',
                'assets/pigmeme/1736754227901.gif',
                'assets/pigmeme/1736754227917.gif',
                'assets/pigmeme/1736754227932.gif',
                'assets/pigmeme/1736754227948.gif',
                'assets/pigmeme/1736754227964.gif',
                'assets/pigmeme/1736754227979.gif',
                'assets/pigmeme/1736754227995.gif',
                'assets/pigmeme/1736754228026.gif',
                'assets/pigmeme/1736755414858.gif',
                'assets/pigmeme/1736755414881.gif',
                'assets/pigmeme/1736755414902.gif',
                'assets/pigmeme/1736755414926.gif',
                'assets/pigmeme/1736755414948.gif',
                'assets/pigmeme/1736755414968.gif',
                'assets/pigmeme/1736755414991.gif',
                'assets/pigmeme/1736755415008.gif',
                'assets/pigmeme/1736755415028.gif',
                'assets/pigmeme/1736755415049.gif',
                'assets/pigmeme/1736755415067.gif',
                'assets/pigmeme/1736755415084.gif',
                'assets/pigmeme/1736755415099.gif',
                'assets/pigmeme/1736755415125.gif',
                'assets/pigmeme/1736755415164.gif',
                'assets/pigmeme/1736755415185.gif',
                'assets/pigmeme/1736755415212.gif',
                'assets/pigmeme/1736755415240.gif',
                'assets/pigmeme/1736755415265.gif',
                'assets/pigmeme/1736755415285.gif',
                'assets/pigmeme/1736755415311.gif',
                'assets/pigmeme/1736755415328.gif',
                'assets/pigmeme/1736755415346.gif',
                'assets/pigmeme/1736755415366.gif',
                'assets/pigmeme/1736755415386.gif',
                'assets/pigmeme/1736755415415.gif',
                'assets/pigmeme/1736755415440.gif',
                'assets/pigmeme/1736755415471.gif',
                'assets/pigmeme/1736755415492.gif',
                'assets/pigmeme/1736755415514.gif',
                'assets/pigmeme/1736755415537.gif',
                'assets/pigmeme/1736755415557.gif',
                'assets/pigmeme/1736755415577.gif',
                'assets/pigmeme/1736755415610.gif',
                'assets/pigmeme/1736755415627.gif',
                'assets/pigmeme/1736755415645.gif',
                'assets/pigmeme/1736755415668.gif',
                'assets/pigmeme/1736755415692.gif',
                'assets/pigmeme/1736755415724.gif',
                'assets/pigmeme/1736755415790.gif',
                'assets/pigmeme/1736755415825.jpg',
                'assets/pigmeme/1736755415855.jpg',
                'assets/pigmeme/1736755415887.jpg',
                'assets/pigmeme/1736755783413.gif',
                'assets/pigmeme/1736755783427.gif',
                'assets/pigmeme/1736755783438.gif',
                'assets/pigmeme/1736755783452.gif',
                'assets/pigmeme/1736755783465.gif',
                'assets/pigmeme/1736755783480.gif',
                'assets/pigmeme/1736755783492.gif',
                'assets/pigmeme/1736755783504.gif',
                'assets/pigmeme/1736755783515.gif',
                'assets/pigmeme/1736755783527.gif',
                'assets/pigmeme/1736755783539.gif',
                'assets/pigmeme/1736755783552.gif',
                'assets/pigmeme/1736755783564.gif',
                'assets/pigmeme/1736755783576.gif',
                'assets/pigmeme/1736755783588.gif',
                'assets/pigmeme/1736755783601.gif',
                'assets/pigmeme/1736755783615.gif',
                'assets/pigmeme/1736755783627.gif',
                'assets/pigmeme/1736755783639.gif',
                'assets/pigmeme/1736755783650.gif',
                'assets/pigmeme/1736755783661.gif',
                'assets/pigmeme/1736755783672.gif',
                'assets/pigmeme/1736755783687.gif',
                'assets/pigmeme/1736755783703.gif',
                'assets/pigmeme/1736755783717.gif',
                'assets/pigmeme/1736755783735.gif',
                'assets/pigmeme/1736755783751.gif'
                // 添加更多 GIF 文件路径
            ];
        },

        // 打开弹窗
        openModal(gif) {
            this.modalGif = gif;
            this.modalVisible = true;
        },

        // 关闭弹窗
        closeModal() {
            this.modalVisible = false;
            this.modalGif = null;
        },
    }
}).mount('#app');

