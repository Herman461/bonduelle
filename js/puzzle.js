const imageObj = new Image();


const data = [
    {
        id: 1,
        width: 202,
        height: 171,
        imageSrc: 'images/puzzles/1.svg',
        href: null,
    },
    {
        id: 2,
        width: 182,
        height: 206,
        imageSrc: 'images/puzzles/2.svg',
        href: null,
    },
    {
        id: 3,
        width: 202,
        height: 171,
        imageSrc: 'images/puzzles/3.svg',
        href: null,
    },
    {
        id: 4,
        width: 170,
        height: 206,
        imageSrc: 'images/puzzles/4.svg',
        href: null,
    },
    {
        id: 5,
        width: 247,
        height: 169,
        imageSrc: 'images/puzzles/5.svg',
        href: null,
    },
    {
        id: 6,
        width: 170,
        height: 206,
        imageSrc: 'images/puzzles/6.svg',
        href: null,
    },
]
//
// const dragStart = function () {
//     this.classList.add("hold")
// };
//
// const dragEnd = function () {
//     // this.className.add("fill")
//     this.className.remove("hold")
// };
//
// const dragOver = function (e) {
//     // Ref: https://developer.cdn.mozilla.net/en-US/docs/Web/API/Document/dragover_event
//     e.preventDefault();
// };
//
// const dragEnter = function (e) {
//     e.preventDefault();
//     this.className += " hovered";
// };
//
// const dragLeave = function () {
//     this.className = "empty";
// };
//
// const dragDrop = function () {
//     this.className = "empty";
// };

function dragElement(el) {
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    el.onpointerdown = pointerDrag;

    function pointerDrag(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;

        document.onpointermove = elementDrag;
        document.onpointerup = stopElementDrag;
    }

    function elementDrag(e) {
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        el.style.top = el.offsetTop - pos2 + "px";
        el.style.left = el.offsetLeft - pos1 + "px";

    }

    function stopElementDrag(e) {
        document.onpointerup = null;
        document.onpointermove = null;

        const squares = document.querySelectorAll('.quiz__square')
        for (let index = 0; index < squares.length; index++) {
            const square = squares[index]

            const squarePos = square.getBoundingClientRect()
            const squareX = squarePos.x
            const squareY = squarePos.y

            const puzzlePos = e.target.getBoundingClientRect()

            const puzzleX = puzzlePos.x
            const puzzleY = puzzlePos.y
            const puzzleWidth = puzzlePos.width
            const puzzleHeight = puzzlePos.height

            const x = puzzleX - squareX > 0 && puzzleX - squareX < puzzleWidth
            const y = puzzleY - squareY > 0 && puzzleY - squareY < puzzleHeight


            if (x && y)  {
                el.style.top = square.offsetTop + "px";
                el.style.left = square.offsetLeft + "px";
                break;
            }
        }




    }
}



imageObj.onload = async function() {

    imageObj.width = 470
    imageObj.height = 315



    let index = 0;
    for (let h = 0; h < 2; h++) {
        const item = data[index]
        let sourceY = 0

        if (h !== 0) {
            sourceY = h * item.height
        }

        for (let w = 0; w < 3; w++) {
            const canvas = document.createElement('canvas')
            const item = data[index]

            const context = canvas.getContext('2d');

            let sourceX = 0

            if (w !== 0) {
                sourceX = w * item.width;
            }

            canvas.height = item.height
            canvas.width = item.width

            context.width = String(item.width)
            context.height = String(item.height)

            context.drawImage(imageObj, sourceX, sourceY, item.width, item.height, 0, 0, item.width, item.height);

            item.href = canvas.toDataURL()
            index++;
        }
    }
    await setPuzzleForm()

};
imageObj.src = 'images/test2.jpg';

const images = []

async function setPuzzleForm() {

    for (let index = 0; index < data.length; index++) {
        const item = data[index]

        const wrapper = document.createElement('div')

        wrapper.className = 'quiz__piece'

        wrapper.style.width = item.width + 'px'
        wrapper.style.height = item.height + 'px'

        const response = await fetch(item.imageSrc)
        const str = await response.text()



        const doc = new DOMParser()
        const svgImage = doc.parseFromString(str, "image/svg+xml")

        svgImage.querySelector('image').setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', item.href);

        svgImage.querySelector('image').setAttribute( 'width', item.width);
        svgImage.querySelector('image').setAttribute( 'height', item.height);

        svgImage.querySelector('svg').setAttribute('viewBox', '0 0 ' + item.width + ' ' + item.height)
        svgImage.querySelector('svg').setAttribute('width', item.width)
        svgImage.querySelector('svg').setAttribute('height', item.height)
        wrapper.appendChild(svgImage.documentElement)

        // wrapper.setAttribute('draggable', 'true')
        // wrapper.addEventListener("dragstart", dragStart);
        // wrapper.addEventListener("dragend", dragEnd);

        document.querySelector('.quiz__puzzles').appendChild(wrapper)

        dragElement(wrapper)
        // images.push(svgImage.documentElement)
    }
}


//
// const squares = document.querySelectorAll('.quiz__square')
//
// for (let index = 0; index < squares.length; index++) {
//     const square = squares[index]
// }
