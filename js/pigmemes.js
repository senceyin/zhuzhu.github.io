const { createApp } = Vue;


createApp({
    data() {
        return {
            gifs: [], // 存储所有GIF图片
            modalVisible: false, // 弹窗显示状态
            modalGif: null, // 当前放大的 GIF 图片
            page: 1, // 当前页面
            gifsPerPage: 12, // 每页显示的 GIF 数量
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
                'assets/pig-head1.gif',
                'assets/pig-head2.gif',
                'assets/pig-head.gif',
                'assets/pig-header.gif'
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
app.use(VueLazyload);
