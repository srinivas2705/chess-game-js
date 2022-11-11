let board = document.getElementById("board");


let x = 1, y = 1;

for (i = 1; i <= 64; i++) {
    const box = document.createElement("div");
    const img = document.createElement("img");
    img.setAttribute("src", "#");
    img.classList.add("imgPiece");
    img.setAttribute("alt", "");
    box.appendChild(img);
    box.classList.add("box");
    board.appendChild(box);
    box.setAttribute("data-xIndex", x);
    box.setAttribute("data-yIndex", y);
    box.setAttribute("data-cords", `(${x},${y})`);
    // box.innerText = "(" + x + "," + y + ")";
    if ((x + y) % 2 == 0) {
        box.style.backgroundColor = "#393E46";
    }
    else {
        box.style.backgroundColor = "#6D9886";
    }
    x++;
    if (x > 8) {
        x = 1;
        y++;

    }
}

const showMoves = (piece) => {
    const moves = piece.moves;
    moves.forEach(m => {
        for (const box of boxes) {
            if (m.x == box.dataset.xindex && m.y == box.dataset.yindex) {
                if (box.dataset.color == piece.color) {
                    box.classList.add("cantKill");
                }
                else {
                    box.classList.add("canKill");
                }
                if (box.dataset.color == "" || box.dataset.color == null || box.dataset.color == undefined) {
                    box.classList.remove("canKill")
                    box.classList.add("possibleMove");
                }


            }
        }
    })
}

const resetPossibleMoves = (piece) => {
    const moves = piece.moves;
    moves.forEach(m => {
        for (const box of boxes) {
            if (m.x == box.dataset.xindex && m.y == box.dataset.yindex) {
                box.classList.remove("possibleMove");
                box.classList.remove("canKill");
                box.classList.remove("cantKill");
            }
        }
    })
}



class Pieces {
    constructor(color, name, initialX, initialY, image) {
        this.color = color;
        this.name = name;
        this.initialPos = {
            x: initialX,
            y: initialY
        };
        this.currentPos = {
            x: initialX,
            y: initialY
        }
        this.image = image;
        this.moves = [];
    }
}


class Pawn extends Pieces {
    constructor(color, name, initialX, intialY, image) {
        super(color, name, initialX, intialY, image);
        this.initialMove = true;
    }
    getPossibleMoves = () => {
        if (this.moves.length) {
            showMoves(this);
            return;
        }
        if (this.color == "black") {
            if (this.initialMove) {
                this.moves.push({
                    x: this.currentPos.x,
                    y: this.currentPos.y + 2
                })
            }
            this.moves.push({
                x: this.currentPos.x,
                y: this.currentPos.y + 1
            })
            const box1 = document.querySelector(`div[data-cords="(${this.currentPos.x + 1},${this.currentPos.y + 1})"]`);
            const box2 = document.querySelector(`div[data-cords="(${this.currentPos.x - 1},${this.currentPos.y + 1})"]`);
            if (box1 && box1.dataset.color && box1.dataset.color != this.color) {
                this.moves.push({
                    x: this.currentPos.x + 1,
                    y: this.currentPos.y + 1
                })
            }
            if (box2 && box2.dataset.color && box2.dataset.color != this.color) {
                this.moves.push({
                    x: this.currentPos.x - 1,
                    y: this.currentPos.y + 1
                })
            }
        }
        else {
            if (this.initialMove) {
                this.moves.push({
                    x: this.currentPos.x,
                    y: this.currentPos.y - 2
                })
            }
            this.moves.push({
                x: this.currentPos.x,
                y: this.currentPos.y - 1
            })
            const box1 = document.querySelector(`div[data-cords="(${this.currentPos.x + 1},${this.currentPos.y - 1})"]`);
            const box2 = document.querySelector(`div[data-cords="(${this.currentPos.x - 1},${this.currentPos.y - 1})"]`);
            if (box1 && box1.dataset.color && box1.dataset.color != this.color) {
                this.moves.push({
                    x: this.currentPos.x + 1,
                    y: this.currentPos.y - 1
                })
            }
            if (box2 && box2.dataset.color && box2.dataset.color != this.color) {
                this.moves.push({
                    x: this.currentPos.x - 1,
                    y: this.currentPos.y - 1
                })
            }
            showMoves(this);
        }
    }
}
class King extends Pieces {
    constructor(color, name, initialX, intialY, image) {
        super(color, name, initialX, intialY, image)
    }
    getPossibleMoves = () => {
        if (this.moves.length) {
            showMoves(this);
            return;
        }
        let newX, newY;
        newX = this.currentPos.x - 1;
        newY = this.currentPos.y - 1;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
            this.moves.push({ x: newX, y: newY });
        }
        newX = this.currentPos.x - 1;
        newY = this.currentPos.y;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
            this.moves.push({ x: newX, y: newY });
        }
        newX = this.currentPos.x - 1;
        newY = this.currentPos.y + 1;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
            this.moves.push({ x: newX, y: newY });
        }
        newX = this.currentPos.x;
        newY = this.currentPos.y - 1;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
            this.moves.push({ x: newX, y: newY });
        }
        newX = this.currentPos.x;
        newY = this.currentPos.y + 1;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
            this.moves.push({ x: newX, y: newY });
        }
        newX = this.currentPos.x + 1;
        newY = this.currentPos.y + 1;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
            this.moves.push({ x: newX, y: newY });
        }
        newX = this.currentPos.x + 1;
        newY = this.currentPos.y;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
            this.moves.push({ x: newX, y: newY });
        }
        newX = this.currentPos.x + 1;
        newY = this.currentPos.y - 1;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
            this.moves.push({ x: newX, y: newY });
        }
        showMoves(this);
    }
}

class Bishop extends Pieces {
    constructor(color, name, initialX, intialY, image) {
        super(color, name, initialX, intialY, image)
    }
    getPossibleMoves = () => {
        if (this.moves.length) {
            validateBishopMoves(this);
            showMoves(this);
            return;
        }
        let x = 7, y = 1;
        let newX, newY;
        while (x > 0) {
            newX = this.currentPos.x + x;
            newY = this.currentPos.y + x;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
                this.moves.push({ x: newX, y: newY });
            }
            x--;
        }
        while (y < 7) {
            newX = this.currentPos.x - y;
            newY = this.currentPos.y - y;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
                this.moves.push({ x: newX, y: newY });
            }
            y++;
        }

        x = 7, y = 1;

        while (y < 7) {
            newX = this.currentPos.x + y;
            newY = this.currentPos.y - y;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
                this.moves.push({ x: newX, y: newY });
            }
            y++;
        }
        while (x > 0) {
            newX = this.currentPos.x - x;
            newY = this.currentPos.y + x;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
                this.moves.push({ x: newX, y: newY });
            }
            x--;
        }
        let validatedMoves = validateBishopMoves(this);
        this.moves = validatedMoves;
        showMoves(this);
    }

}


class Knight extends Pieces {
    constructor(color, name, initialX, intialY, image) {
        super(color, name, initialX, intialY, image)
    }
    getPossibleMoves = () => {
        if (this.moves.length) {
            showMoves(this);
            return;
        }

        let newX, newY;
        newX = this.currentPos.x + 2;
        newY = this.currentPos.y - 1;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
            this.moves.push({ x: newX, y: newY });
        }
        newX = this.currentPos.x + 2;
        newY = this.currentPos.y + 1;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
            this.moves.push({ x: newX, y: newY });
        }
        newX = this.currentPos.x - 2;
        newY = this.currentPos.y - 1;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
            this.moves.push({ x: newX, y: newY });
        }
        newX = this.currentPos.x - 2;
        newY = this.currentPos.y + 1;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
            this.moves.push({ x: newX, y: newY });
        }
        newX = this.currentPos.x + 1;
        newY = this.currentPos.y + 2;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
            this.moves.push({ x: newX, y: newY });
        }
        newX = this.currentPos.x - 1;
        newY = this.currentPos.y + 2;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
            this.moves.push({ x: newX, y: newY });
        }
        newX = this.currentPos.x + 1;
        newY = this.currentPos.y - 2;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
            this.moves.push({ x: newX, y: newY });
        }
        newX = this.currentPos.x - 1;
        newY = this.currentPos.y - 2;
        if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
            this.moves.push({ x: newX, y: newY });
        }
        showMoves(this);
    }
}

class Queen extends Pieces {
    constructor(color, name, initialX, intialY, image) {
        super(color, name, initialX, intialY, image)
    }
    getPossibleMoves = () => {
        if (this.moves.length) {
            showMoves(this);
            return;
        }
        let x = 7, y = 1;
        let newX, newY;
        while (x > 0) {
            newX = this.currentPos.x + x;
            newY = this.currentPos.y + x;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
                this.moves.push({ x: newX, y: newY });
            }
            x--;
        }
        while (y < 7) {
            newX = this.currentPos.x - y;
            newY = this.currentPos.y - y;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
                this.moves.push({ x: newX, y: newY });
            }
            y++;
        }

        x = 7, y = 1;

        while (y < 7) {
            newX = this.currentPos.x + y;
            newY = this.currentPos.y - y;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
                this.moves.push({ x: newX, y: newY });
            }
            y++;
        }
        while (x > 0) {
            newX = this.currentPos.x - x;
            newY = this.currentPos.y + x;
            if (newX > 0 && newX < 9 && newY > 0 && newY < 9) {
                this.moves.push({ x: newX, y: newY });
            }
            x--;
        }

        x = 7, y = 7;
        while (x > 0) {
            let newX = this.currentPos.x + x;
            if (newX > 8) {
                newX -= 8;
            }
            this.moves.push({
                x: newX,
                y: this.currentPos.y
            });
            x--;
        }
        while (y > 0) {
            let newY = this.currentPos.y + y;
            if (newY > 8) {
                newY -= 8;
            }
            this.moves.push({
                x: this.currentPos.x,
                y: newY
            });
            y--;
        }



    }
}

class Rook extends Pieces {
    constructor(color, name, initialX, intialY, image) {
        super(color, name, initialX, intialY, image)
    }
    getPossibleMoves = () => {
        if (this.moves.length) {
            validateRookMoves(this);
            showMoves(this);
            return;
        }
        let x = 7, y = 7;
        while (x > 0) {
            let newX = this.currentPos.x + x;
            if (newX > 8) {
                newX -= 8;
            }
            this.moves.push({
                x: newX,
                y: this.currentPos.y
            });
            x--;
        }
        while (y > 0) {
            let newY = this.currentPos.y + y;
            if (newY > 8) {
                newY -= 8;
            }
            this.moves.push({
                x: this.currentPos.x,
                y: newY
            });
            y--;
        }

        let validatedMoves = validateRookMoves(this);
        this.moves = validatedMoves;
        showMoves(this);
    }
}

const pb1 = new Pawn("black", "Black Pawn", 1, 2, "./media/b_pawn.svg");
const pb2 = new Pawn("black", "Black Pawn", 2, 2, "./media/b_pawn.svg");
const pb3 = new Pawn("black", "Black Pawn", 3, 2, "./media/b_pawn.svg");
const pb4 = new Pawn("black", "Black Pawn", 4, 2, "./media/b_pawn.svg");
const pb5 = new Pawn("black", "Black Pawn", 5, 2, "./media/b_pawn.svg");
const pb6 = new Pawn("black", "Black Pawn", 6, 2, "./media/b_pawn.svg");
const pb7 = new Pawn("black", "Black Pawn", 7, 2, "./media/b_pawn.svg");
const pb8 = new Pawn("black", "Black Pawn", 8, 2, "./media/b_pawn.svg");
const bb1 = new Bishop("black", "Black Bishop", 3, 1, "./media/b_bishop.svg");
const bb2 = new Bishop("black", "Black Bishop", 6, 1, "./media/b_bishop.svg");
const rb1 = new Rook("black", "Black Rook", 1, 1, "./media/b_rook.svg");
const rb2 = new Rook("black", "Black Rook", 8, 1, "./media/b_rook.svg");
const kb1 = new Knight("black", "Black Knight", 2, 1, "./media/b_knight.svg");
const kb2 = new Knight("black", "Black Knight", 7, 1, "./media/b_knight.svg");
const Kb = new King("black", "Black King", 5, 1, "./media/b_king.svg");
const Qb = new Queen("black", "Black Queen", 4, 1, "./media/b_queen.svg");


const pw1 = new Pawn("white", "White Pawn", 1, 7, "./media/w_pawn.svg");
const pw2 = new Pawn("white", "White Pawn", 2, 7, "./media/w_pawn.svg");
const pw3 = new Pawn("white", "White Pawn", 3, 7, "./media/w_pawn.svg");
const pw4 = new Pawn("white", "White Pawn", 4, 7, "./media/w_pawn.svg");
const pw5 = new Pawn("white", "White Pawn", 5, 7, "./media/w_pawn.svg");
const pw6 = new Pawn("white", "White Pawn", 6, 7, "./media/w_pawn.svg");
const pw7 = new Pawn("white", "White Pawn", 7, 7, "./media/w_pawn.svg");
const pw8 = new Pawn("white", "White Pawn", 8, 7, "./media/w_pawn.svg");
const bw1 = new Bishop("white", "White Bishop", 3, 8, "./media/w_bishop.svg");
const bw2 = new Bishop("white", "White Bishop", 6, 8, "./media/w_bishop.svg");
const rw1 = new Rook("white", "White Rook", 1, 8, "./media/w_rook.svg");
const rw2 = new Rook("white", "White Rook", 8, 8, "./media/w_rook.svg");
const kw1 = new Knight("white", "White Knight", 2, 8, "./media/w_knight.svg");
const kw2 = new Knight("white", "White Knight", 7, 8, "./media/w_knight.svg");
const Kw = new King("white", "White King", 5, 8, "./media/w_king.svg");
const Qw = new Queen("white", "White Queen", 4, 8, "./media/w_queen.svg");


const boxes = document.getElementsByClassName("box");
const piecesArr = [pb1, pb2, pb3, pb4, pb5, pb6, pb7, pb8, bb1, bb2, rb1, rb2, kb1, kb2, Kb, Qb,
    pw1, pw2, pw3, pw4, pw5, pw6, pw7, pw8, bw1, bw2, rw1, rw2, kw1, kw2, Kw, Qw];

piecesArr.forEach(p => {
    for (const box of boxes) {
        if (p.initialPos.x == box.dataset.xindex && p.initialPos.y == box.dataset.yindex) {
            box.firstChild.setAttribute("src", p.image);
            box.setAttribute("data-name", p.name);
            box.setAttribute("data-color", p.color);
            box.addEventListener("mouseenter", p.getPossibleMoves);
            box.addEventListener("mouseleave", () => resetPossibleMoves(p));
        }
    }


})

for (const box of boxes) {
    if (box.dataset.name == "" || box.dataset.name == null || box.dataset.name == undefined) {
        box.firstElementChild.classList.add("hideImg");
    }
}

const findDistance = (a, b) => {
    return Math.sqrt((Math.pow((a.x-b.x),2) + Math.pow((a.y-b.y),2)));
}

const filterDirections = (directions, piece) => {
    let newMoves = [];
    for (const dir in directions) {
        for (const d of directions[dir]) {
            const box = document.querySelector(`div[data-cords="(${d.x},${d.y})"]`);
            const color = box.dataset.color;
            if (color != "" && color != null && color != undefined) {
                // if (color == piece.color) {
                //     break;
                // }
                newMoves.push(d);
                break;
            }
            else {
                newMoves.push(d);
            }
        }
    }
    return newMoves;

}

const validateRookMoves = (piece) => {
    let current = piece.currentPos;
    let moves = piece.moves;
    moves = moves.sort((a, b) => {
        console.log(a,b,current)
        console.log(findDistance(a, current) , findDistance(b, current));
        return findDistance(a, current) - findDistance(b, current)
    });


    let directions = {
        up: [],
        down: [],
        right: [],
        left: []
    }
    moves.forEach(m => {
        if (m.y > current.y && m.x == current.x) {
            directions.down = [...directions.down, m]
        }
        if (m.y < current.y && m.x == current.x) {
            directions.up = [...directions.up, m]
        }
        if (m.y == current.y && m.x > current.x) {
            directions.right = [...directions.right, m]
        }
        if (m.y == current.y && m.x < current.x) {
            directions.left = [...directions.left, m]
        }
    })
    return filterDirections(directions, piece);
}

const validateBishopMoves = (piece) => {
    let current = piece.currentPos;
    let moves = piece.moves;
    moves = moves.sort((a, b) => findDistance(a, current) - findDistance(b, current));
    console.log(moves)

    let directions = {
        upRight: [],
        upLeft: [],
        downLeft: [],
        downRight: []
    }

    moves.forEach(m => {
        if (m.x > current.x && m.y < current.y) {
            directions.upRight = [...directions.upRight, m]
        }
        if (m.x < current.x && m.y < current.y) {
            directions.upLeft = [...directions.upLeft, m]
        }
        if (m.x > current.x && m.y > current.y) {
            directions.downLeft = [...directions.downLeft, m]
        }
        if (m.x < current.x && m.y > current.y) {
            directions.downRight = [...directions.downRight, m]
        }
    })
    return filterDirections(directions, piece)
}


const kingValidateMoves = (piece) =>{
    
}
