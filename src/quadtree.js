import AABB from './aabb';
import Victor from 'victor';

export default class QuadTree {
    constructor(aabb, maxObjects = 12, maxLevels = 4, level = 0) {
        this._aabb = aabb;
        this._maxObjects = maxObjects;
        this._maxLevels = maxLevels;
        this._nodeArr = new Array();
        this._objectArr = new Array();
        this._level = level;
    }

    /*clear() {
        this = new QuadTree(this._aabb, this._maxObjects, this._maxLevels);
    }*/

    put(obj) {
        if (this._nodeArr.length > 0) {
            const index = this._getIndex(obj);

            if (index !== -1) {
                this._nodeArr[index].put(obj);
            }
        }

        this._objectArr.push(obj);

        if (this._objectArr.length > this._maxObjects && this._level < this._maxLevels) {
            this._split();
        }
    }

    get(obj) {
        const index = this._getIndex(obj);
        if (index !== -1 && this._nodeArr.length > 0) {
            return this._nodeArr[index].get(obj);
        }

        return this._objectArr;
    }

    remove(obj, idStr) {
        const index = this._objectArr.findIndex(element => element[idStr] === obj[idStr]);

        if (index !== -1) {
            this._objectArr.splice(index, 1);
            return 1;
        } else {
            for (let quad of this._nodeArr) {
                if (quad.remove(obj, idStr) === 1) {
                    return 1;
                }
            }
        }
    }

    /*findNode(obj, idStr) {
        const index = this._objectArr.findIndex(element => element[idStr] === obj[idStr]);

        if (index !== -1) {
            this._objectArr.splice(index, 1);
            return 1;
        } else {
            for (let quad of this._nodeArr) {
                if (quad.remove(obj, idStr) === 1) {
                    return 1;
                }
            }
        }
    }*/

    _split() {
        const center = Victor(this._aabb.width / 2, this._aabb.height / 2);

        this._nodeArr.push(new QuadTree(new AABB(Victor(this._aabb.x + center.x, this._aabb.y), center), this._maxObjects, this._maxLevels, this._level + 1));
        this._nodeArr.push(new QuadTree(new AABB(Victor(this._aabb.x, this._aabb.y), center), this._maxObjects, this._maxLevels, this._level + 1));
        this._nodeArr.push(new QuadTree(new AABB(Victor(this._aabb.x, this._aabb.y + center.y), center), this._maxObjects, this._maxLevels, this._level + 1));
        this._nodeArr.push(new QuadTree(new AABB(Victor(this._aabb.x + center.x, this._aabb.y + center.y), center), this._maxObjects, this._maxLevels, this._level + 1));

        let i = 0;
        while (i < this._objectArr.length) {
            const index = this._getIndex(this._objectArr[i]);
            if (index !== -1) {
                this._nodeArr[index].put(this._objectArr.splice(i,1));
            } else {
                i++;
            }
        }
    }

    _getIndex(obj) {
        let index = -1;
        const center = Victor(this._aabb.x + this._aabb.width / 2, this._aabb.y + this._aabb.height / 2);

        if (obj.x + obj.w < center.x) {
            if (obj.y > center.y) {
                index = 1;
            } else if (obj.y + obj.h < center.y) {
                index = 2;
            }
        } else if (obj.x > center.x) {
            if (obj.y > center.y) {
                index = 0;
            } else if (obj.y + obj.h < center.y) {
                index = 3;
            }
        }

        return index;
    }
}
