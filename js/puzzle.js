const imageObj = new Image(475, 320);


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
        height: 160,
        imageSrc: 'images/puzzles/5.svg',
        href: null,
    },
    {
        id: 6,
        width: 176,
        height: 206,
        imageSrc: 'images/puzzles/6.svg',
        href: null,
    },
]

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

            const x = puzzleX - squareX > -40 && puzzleX - squareX + 100 < puzzleWidth
            const y = puzzleY - squareY > -40 && puzzleY - squareY + 100 < puzzleHeight


            if (x && y)  {



                switch (index) {
                    case 1:
                        el.style.left = square.offsetLeft - 11 + "px";
                        el.style.top = square.offsetTop + "px";
                        break;
                    case 2:
                        el.style.left = square.offsetLeft - 43 + "px";
                        el.style.top = square.offsetTop + "px";
                        break;
                    case 3:
                        el.style.top = square.offsetTop - 48 + "px";
                        el.style.left = square.offsetLeft + "px";
                        break;
                    case 4:
                        el.style.top = square.offsetTop - 20 + "px";
                        el.style.left = square.offsetLeft - 30 + "px";
                        break;
                    default:
                        el.style.top = square.offsetTop + "px";
                        el.style.left = square.offsetLeft + "px";
                }
                break;
            }
        }




    }
}



imageObj.onload = async function() {

    let index = 0;
    for (let h = 0; h < 2; h++) {
        const item = data[index]
        let sourceY = 0

        if (h !== 0) {
            sourceY = h * data[index - 1].height
        }
        let sourceX = 0
        for (let w = 0; w < 3; w++) {
            const canvas = document.createElement('canvas')
            const item = data[index]

            const context = canvas.getContext('2d');



            if (w !== 0) {
                sourceX += data[index - 1].width;
            }

            canvas.height = item.height
            canvas.width = item.width

            context.width = String(item.width)
            context.height = String(item.height)

            const updatedImage = resizeImage(imageObj)

            switch (index) {
                case 0:
                    context.drawImage(updatedImage, sourceX, sourceY, item.width, item.height, 0, 0, item.width, item.height);
                    break;
                case 1:
                    context.drawImage(updatedImage, sourceX - 56, sourceY, item.width, item.height, 0, 0, item.width, item.height);
                    break;
                case 2:
                    context.drawImage(updatedImage, 270, sourceY, item.width, item.height, 0, 0, item.width, item.height);
                    break;
                case 3:
                    context.drawImage(updatedImage, sourceX, sourceY - 56, item.width, item.height, 0, 0, item.width, item.height);
                    break;
                case 4:
                    console.log(sourceY)
                    context.drawImage(updatedImage, sourceX - 56, sourceY, item.width, item.height, 0, 0, item.width, item.height);
                    break;
                case 5:
                    context.drawImage(updatedImage, 220, sourceY - 56, item.width, item.height, 0, 0, item.width, item.height);
                    break;
            }

            item.href = canvas.toDataURL()
            index++;
        }
    }
    await setPuzzleForm()

};

imageObj.src = 'images/test2.jpg';

function resizeImage(image) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext("2d");
    canvas.height = 320
    canvas.width = 475
    context.drawImage(image, 0, 0, 586, 320)

    const dataUrl = canvas.toDataURL('image/jpeg')
    const newImage = document.createElement('img')

    newImage.src = dataUrl
    return newImage
}


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

        document.querySelector('.quiz__puzzles').appendChild(wrapper)

        dragElement(wrapper)
    }
}

