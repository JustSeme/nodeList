function List(nm) {
    this.end = { nm: null, nxt: null }
    this.beg = { nm: null, nxt: this.end }

    this.length = 0

    if(nm !== undefined) {
        this.push(nm)
    }
}

List.prototype.toString = function() {
    let n = this.beg.nxt
    let str = '('

    while(n !== this.end) {
        str += n.nm + (n.nxt !== this.end ? ', ' : '')
        n = n.nxt
    }

    return str + ')'
}

List.prototype.unshift = function(nm) {
    this.length++

    this.beg.nxt = { nm, nxt: this.beg.nxt }
}

List.prototype.shift = function() {
    if(this.length === 0) {
        return
    }
    this.length--

    this.beg = this.beg.nxt
    const returnedNm = this.beg.nm
    this.beg.nm = null
    return returnedNm
}

List.prototype.push = function(nm) {
    this.length++
    
    this.end.nm = nm
    this.end = this.end.nxt = { nm: null, nxt: null }
}

List.prototype.pop = function() {
    if(this.length === 0) {
        return
    }

    let n = this.beg.nxt
    while(n.nxt !== this.end) {
        n = n.nxt
    }
    this.end = n
    return n.nm
}

List.prototype.node = function(pos) {
    let n = this.beg.nxt
    while(n !== this.end && pos-- > 0) {
        n = n.nxt
    }

    return n
}

List.prototype.insert = function(pos, nm) {
    if(pos <= 0) {
        return this.unshift(nm)
    }
    if(pos >= this.length) {
        return this.push(nm)
    }

    this.length++
    const n = this.node(pos - 1)
    n.nxt = { nm, nxt: n.nxt }
}

const lst = new List('first')

lst.push('second')

lst.push('third')

lst.unshift('minus-first')

const shiftedEl = lst.shift()

const popedEl = lst.pop()

const secondEl = lst.node(1)

lst.insert(1, 'insertedSecondElement')

document.write(lst.toString())
document.write('<br><br>')
document.write('shiftedElement - ', shiftedEl, ' - expect "minus-first"');
document.write('<br><br>')
document.write('popedElement - ', popedEl, ' - expect "third"');
document.write('<br><br>')
document.write('secondElement - ', secondEl.nm, ' - expect "second"')
document.write('<br><br>')