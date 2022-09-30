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
        document.body.appendChild(svgImage.documentElement)
        // images.push(svgImage.documentElement)
    }


}
