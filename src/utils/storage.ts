class Storage {
    public key: string;

    constructor(key: string) {
        this.key = window.name + ':' + key;
    }

    public set(value: string) {
        localStorage.setItem(this.key, value);
        console.log(this.key, value);
    }

    public get() {
        return localStorage.getItem(this.key);
    }
}

// 侧边栏是否收起
export const menuCollapseStorage = new Storage('menu-collapse');
