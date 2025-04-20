/**
* @description The wildcard dictionary implementation will be given a list of string.
* And you will need to write a funciton to find out if the user input is inside the dictionary.
* This implementation is an extended feature for question `Simple Dictionary`

*
* input: 'cat', 'car', 'bar'
*
* function setup(input: string[])
* function isInDict(word: string)
*
* dict.setup(['cat', 'car', 'bar'])
* dict.isInDict('cat') // true
* dict.isInDict('bat') // false
*
* WildCard
* dict.isInDict('*at') // true
* dict.isInDict('cr*') // false
*
*/

interface ITrieNode {
    children: Map<string, ITrieNode>;
    isEndOfWord: boolean;
}
interface IDictionary {
    setup(words: string[]): void;
    isInDict(pattern: string): boolean;
}
class TrieNode implements ITrieNode {
    children: Map<string, ITrieNode>;
    isEndOfWord: boolean;
    constructor() {
        this.children = new Map<string, ITrieNode>()
        this.isEndOfWord = false
    }
}

class WildcardDictionary implements IDictionary {
    root: TrieNode
    constructor() {
        this.root = new TrieNode()
    }
    setup(words: string[]): void {
        let node = this.root
        for (let word of words) {
            for (let char of word) {
                if(!node.children.get(char)){
                    node.children.set(char, new TrieNode())
                }
                node = node.children.get(char)!
            }
            node.isEndOfWord = true
            node = this.root
        }
    }
    isInDict(pattern: string): boolean {
        const search = (node: TrieNode, pattern: string): boolean => {
            for (let i = 0; i < pattern.length; i++) {
                const char = pattern[i];
                if (char === '*') {
                    for (const child of node.children.values()) {
                        if (search(child, pattern.slice(i + 1))) {
                            return true;
                        }
                    }
                    return false;
                } else {
                    if (!node.children.get(char)) {
                        return false;
                    }
                    node = node.children.get(char)!;
                }
            }
            return node.isEndOfWord;
        };
        return search(this.root, pattern);
    }

}

const dict = new WildcardDictionary();
dict.setup(['cat', 'car', 'bar']);
console.log(dict.isInDict('*at'));
console.log(dict.isInDict('cr*'));
