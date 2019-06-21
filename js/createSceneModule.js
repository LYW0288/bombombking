//001215003571707_063634300410000_002125033573737_363634300421212_121215003573737_262624330012121_454545003545454_121210300416161_838385033521212_212124300436363_808385003512120_001214330436360_808185003521200
const valley = "001215003571707063634300410000002125033573737363634300421212121215003573737262624330012121454545003545454121210300416161838385033521212212124300436363808385003512120001214330436360808185003521200"
//000622263326000_010181818181010_232322000233322_454545404545454_223232242233232_018181252181810_002228243822200_627321252123726_222268040862232_726321000123627_222268242862222_607321222122706_000262242362000
const factory = "000622263326000010181818181010232322000233322404545404545404223232242233232018181252181810002228243822200627321252123726222268040862232726321000123627222268242862222607321222122706000262242362000"

const textureLoader = new THREE.TextureLoader()
//LEGO
let legoGeo
let boxShape_lego
//HOUSE
let boxGeo_house
let roofGeo_house
let headMaterials_house
let boxShape_house
//wooden
let boxGeo_wooden
let headMaterials_wooden
let boxShape_wooden
//tree
let branchGeo
let leafGeo
const branchMat = new THREE.MeshPhongMaterial({ color: 0xC77D33 })
const creeperMat_tree = new THREE.MeshPhongMaterial({ color: 0x00B500 })
let boxShape_tree
//bush
let boxGeo_bush
const creeperMat_bush = new THREE.MeshPhongMaterial({ color: 0x00B500 })
//floor
let boxGeo_floor
let floorMat
//warn
let boxGeo_warn
let headMaterials_warn
let boxShape_warn
//block
const downMat = new THREE.MeshPhongMaterial({ color: 0xE84400 })
let blockGeo
let downGeo
let blockMat
let blockShape
//iron
let IronGeo
let ironShape
//col
let ColGeo
let ColShape
const ColMat = new THREE.MeshStandardMaterial({ color: 0x91B1DA })
//col2
let Col2Geo
let Col2Shape
const Col2Mat = new THREE.MeshStandardMaterial({ color: 0xA8BBCC })
//mail
let mailGeo
let headMaterials_mail
let boxShape_mail
//light
let lightMat = new THREE.MeshPhongMaterial({
  color: 0xFFFFFF, transparent: true, opacity: 0.8, emissive: 0x007DFF
})
let lightGeo
let upGeo_light
let downGeo_light
let colMat
let lightShape

function initfactory() {
  //floor
  boxGeo_floor = new THREE.BoxGeometry(1*scale, 1*scale, 1*scale)
  const floorMap = textureLoader.load('./img/floor.png')
  floorMat = new THREE.MeshPhongMaterial({
    map: floorMap
  })
  //warn
  boxGeo_warn = new THREE.BoxGeometry(1*scale, 1.2*scale, 1*scale)
  const headMap_warn = textureLoader.load('./img/warn_up.png')
  const skinMap_warn = textureLoader.load('./img/warn_other.png')
  headMaterials_warn = []
  for (let i = 0; i < 6; i++) {
    let map
    if (i === 2 | i === 3) map = headMap_warn
    else map = skinMap_warn
    headMaterials_warn.push(new THREE.MeshPhongMaterial({ map: map }))
  } 
  boxShape_warn = new CANNON.Box(
    new CANNON.Vec3(0.45 * scale, 0.6 * scale, 0.45 * scale)
  )
  //block
  blockGeo = new THREE.CylinderGeometry(0.01*scale, 0.35*scale, 1*scale)
  const blockMap = textureLoader.load('./img/three.png')
  blockMat = new THREE.MeshPhongMaterial({
    map: blockMap
  })
  downGeo = new THREE.BoxGeometry(0.8*scale, 0.05*scale, 0.8*scale)
  blockShape = new CANNON.Box(
    new CANNON.Vec3(0.25 * scale, 0.5 * scale, 0.25 * scale)
  )
  //iron
  IronGeo = new THREE.BoxGeometry(0.9*scale, 0.9*scale, 0.9*scale)
  const col_x = new THREE.BoxGeometry(1*scale,0.1*scale,  0.1*scale)
  const col_y = new THREE.BoxGeometry(0.1*scale, 1*scale, 0.1*scale)
  const col_z = new THREE.BoxGeometry(0.1*scale, 0.1*scale, 1*scale)

  let up1 = new THREE.Mesh(col_x, branchMat)
  up1.position.set(0, 0.45*scale, 0.45*scale)
  let up2 = up1.clone()
  up2.position.set(0, 0.45*scale, -0.45*scale)
  let up5 = up1.clone()
  up5.position.set(0, 0.45*scale, 0.15*scale)
  let up6 = up1.clone()
  up6.position.set(0, 0.45*scale, -0.15*scale)
  let up3 = new THREE.Mesh(col_z, branchMat)
  up3.position.set(0.45*scale, 0.45*scale, 0)
  let up4 = up3.clone()
  up4.position.set(-0.45*scale, 0.45*scale, 0)
  up1.updateMatrix()
  up2.updateMatrix()
  up3.updateMatrix()
  up4.updateMatrix()
  up5.updateMatrix()
  up6.updateMatrix()
  IronGeo.merge(up1.geometry, up1.matrix)
  IronGeo.merge(up2.geometry, up2.matrix)
  IronGeo.merge(up3.geometry, up3.matrix)
  IronGeo.merge(up4.geometry, up4.matrix)
  IronGeo.merge(up5.geometry, up5.matrix)
  IronGeo.merge(up6.geometry, up6.matrix)
  up1 = new THREE.Mesh(col_x, branchMat)
  up1.position.set(0, -0.45*scale, 0.45*scale)
  up2 = up1.clone()
  up2.position.set(0, -0.45*scale, -0.45*scale)
  up3 = new THREE.Mesh(col_z, branchMat)
  up3.position.set(0.45*scale, -0.45*scale, 0)
  up4 = up3.clone()
  up4.position.set(-0.45*scale, -0.45*scale, 0)
  up1.updateMatrix()
  up2.updateMatrix()
  up3.updateMatrix()
  up4.updateMatrix()
  IronGeo.merge(up1.geometry, up1.matrix)
  IronGeo.merge(up2.geometry, up2.matrix)
  IronGeo.merge(up3.geometry, up3.matrix)
  IronGeo.merge(up4.geometry, up4.matrix)
  up1 = new THREE.Mesh(col_y, branchMat)
  up1.position.set(0.45*scale, 0, 0.45*scale)
  up2 = up1.clone()
  up2.position.set(0.45*scale, 0, -0.45*scale)
  up3 = up1.clone()
  up3.position.set(-0.45*scale, 0, -0.45*scale)
  up4 = up1.clone()
  up4.position.set(-0.45*scale, 0, 0.45*scale)
  up1.updateMatrix()
  up2.updateMatrix()
  up3.updateMatrix()
  up4.updateMatrix()
  IronGeo.merge(up1.geometry, up1.matrix)
  IronGeo.merge(up2.geometry, up2.matrix)
  IronGeo.merge(up3.geometry, up3.matrix)
  IronGeo.merge(up4.geometry, up4.matrix)
  up1 = new THREE.Mesh(col_y, branchMat)
  up1.position.set(0.45*scale, 0, 0.15*scale)
  up2 = up1.clone()
  up2.position.set(0.45*scale, 0, -0.15*scale)
  up3 = up1.clone()
  up3.position.set(0.15*scale, 0, -0.45*scale)
  up4 = up1.clone()
  up4.position.set(-0.15*scale, 0, -0.45*scale)
  up1.updateMatrix()
  up2.updateMatrix()
  up3.updateMatrix()
  up4.updateMatrix()
  IronGeo.merge(up1.geometry, up1.matrix)
  IronGeo.merge(up2.geometry, up2.matrix)
  IronGeo.merge(up3.geometry, up3.matrix)
  IronGeo.merge(up4.geometry, up4.matrix)
  up1 = new THREE.Mesh(col_y, branchMat)
  up1.position.set(-0.45*scale, 0, 0.15*scale)
  up2 = up1.clone()
  up2.position.set(-0.45*scale, 0, -0.15*scale)
  up3 = up1.clone()
  up3.position.set(0.15*scale, 0, 0.45*scale)
  up4 = up1.clone()
  up4.position.set(-0.15*scale, 0, 0.45*scale)
  up1.updateMatrix()
  up2.updateMatrix()
  up3.updateMatrix()
  up4.updateMatrix()
  IronGeo.merge(up1.geometry, up1.matrix)
  IronGeo.merge(up2.geometry, up2.matrix)
  IronGeo.merge(up3.geometry, up3.matrix)
  IronGeo.merge(up4.geometry, up4.matrix)

  ironShape = new CANNON.Box(
    new CANNON.Vec3(0.45 * scale, 0.5 * scale, 0.45 * scale)
  )
  //col
  ColShape = new CANNON.Box(
    new CANNON.Vec3(0.45 * scale, 0.7 * scale, 0.45 * scale)
  )
  ColGeo = new THREE.BoxGeometry(1*scale, 1.2*scale, 1*scale)
  const col_x2 = new THREE.BoxGeometry(1*scale,0.2*scale,  0.2*scale)

  up1 = new THREE.Mesh(col_x2, branchMat)
  up1.position.set(0, 0.7*scale, 0.2*scale)
  up2 = up1.clone()
  up2.position.set(0, 0.7*scale, -0.2*scale)
  up1.updateMatrix()
  up2.updateMatrix()
  ColGeo.merge(up1.geometry, up1.matrix)
  ColGeo.merge(up2.geometry, up2.matrix)
  //col
  Col2Shape = new CANNON.Box(
    new CANNON.Vec3(0.45 * scale, 0.7 * scale, 0.45 * scale)
  )
  Col2Geo = new THREE.BoxGeometry(0.7*scale, 1.4*scale, 1*scale)
  const col_y2 = new THREE.BoxGeometry(0.2*scale, 1.4*scale,  0.2*scale)

  up1 = new THREE.Mesh(col_y2, branchMat)
  up1.position.set(0.4*scale, 0, 0.4*scale)
  up2 = up1.clone()
  up2.position.set(0.4*scale, 0, -0.4*scale)
  up3 = up1.clone()
  up3.position.set(0.4*scale, 0, 0.13*scale)
  up4 = up1.clone()
  up4.position.set(0.4*scale, 0, -0.13*scale)
  up1.updateMatrix()
  up2.updateMatrix()
  up3.updateMatrix()
  up4.updateMatrix()
  Col2Geo.merge(up1.geometry, up1.matrix)
  Col2Geo.merge(up2.geometry, up2.matrix)
  Col2Geo.merge(up3.geometry, up3.matrix)
  Col2Geo.merge(up4.geometry, up4.matrix)
  up1 = new THREE.Mesh(col_y2, branchMat)
  up1.position.set(-0.4*scale, 0, 0.4*scale)
  up2 = up1.clone()
  up2.position.set(-0.4*scale, 0, -0.4*scale)
  up3 = up1.clone()
  up3.position.set(-0.4*scale, 0, 0.13*scale)
  up4 = up1.clone()
  up4.position.set(-0.4*scale, 0, -0.13*scale)
  up1.updateMatrix()
  up2.updateMatrix()
  up3.updateMatrix()
  up4.updateMatrix()
  Col2Geo.merge(up1.geometry, up1.matrix)
  Col2Geo.merge(up2.geometry, up2.matrix)
  Col2Geo.merge(up3.geometry, up3.matrix)
  Col2Geo.merge(up4.geometry, up4.matrix)
  //wooden
  mailGeo = new THREE.BoxGeometry(1*scale, 1*scale, 1*scale)
  const headMap_mail = textureLoader.load('./img/paper_up.png')
  const skinMap_mail = textureLoader.load('./img/paper_other.png')
  headMaterials_mail = []
  for (let i = 0; i < 6; i++) {
    let map
    if (i === 2 | i === 3) map = headMap_mail
    else map = skinMap_mail
    headMaterials_mail.push(new THREE.MeshPhongMaterial({ map: map }))
  } 
  mailShape = new CANNON.Box(
    new CANNON.Vec3(0.45 * scale, 0.5 * scale, 0.45 * scale)
  )
  //light
  lightGeo = new THREE.CylinderGeometry(0.4*scale, 0.4*scale, 1.6*scale)
  upGeo_light = new THREE.CylinderGeometry(0.25*scale, 0.5*scale, 0.3*scale)
  downGeo_light = new THREE.CylinderGeometry(0.5*scale, 0.5*scale, 0.2*scale)
  colMat = new THREE.MeshStandardMaterial({ color: 0x4A63B5 })
  lightShape = new CANNON.Box(
    new CANNON.Vec3(0.45 * scale, 1 * scale, 0.45 * scale)
  )

}
function createlight(x ,z, scale) {
  lightObj = new Light(scale, lightGeo, upGeo_light, downGeo_light, colMat, lightMat, lightShape)
  world.addBody(lightObj.boxBody)
  scene.add(lightObj.Light)
  lightObj.Light.position.set(x*scale, 1*scale, z*scale)
  lightObj.boxBody.position.set(x*scale, 1*scale, z*scale)
  explores.push(lightObj.boxBody)
  exploreMeshes.push(lightObj.Light)
  exploreKind.push('Tree')
}
function createIron(x, z, color, scale) {
  const IronMat = new THREE.MeshStandardMaterial({ color: color })//0x57A2F3 0x53C4FF
  ironObj = new Iron(IronGeo, IronMat, ironShape)
  world.addBody(ironObj.boxBody)
  scene.add(ironObj.Iron)
  ironObj.Iron.position.set(x*scale, 0.5*scale, z*scale)
  ironObj.boxBody.position.set(x*scale, 0.5*scale, z*scale)
  explores.push(ironObj.boxBody)
  exploreMeshes.push(ironObj.Iron)
  exploreKind.push('lego')
}
function createCol(x, z, scale) {
  colObj = new Col(ColGeo, ColMat, ColShape)
  world.addBody(colObj.boxBody)
  scene.add(colObj.Col)
  colObj.Col.position.set(x*scale, 0.5*scale, z*scale)
  colObj.boxBody.position.set(x*scale, 0.5*scale, z*scale)
  explores.push(colObj.boxBody)
  exploreMeshes.push(colObj.Col)
  exploreKind.push('House')
}
function createCol2(x, z, scale) {
  col2Obj = new Col2(Col2Geo, Col2Mat, Col2Shape)
  world.addBody(col2Obj.boxBody)
  scene.add(col2Obj.Col2)
  col2Obj.Col2.position.set(x*scale, 0.5*scale, z*scale)
  col2Obj.boxBody.position.set(x*scale, 0.5*scale, z*scale)
  explores.push(col2Obj.boxBody)
  exploreMeshes.push(col2Obj.Col2)
  exploreKind.push('House')
}
function createMail(x ,z, scale) {
  mailObj = new Mail(scale, mailGeo, headMaterials_mail, mailShape)
  world.addBody(mailObj.boxBody)
  scene.add(mailObj.Mail)
  mailObj.Mail.position.set(x*scale, 0.5*scale, z*scale)
  mailObj.boxBody.position.set(x*scale, 0.5*scale, z*scale)
  boxes.push(mailObj.boxBody)
  boxMeshes.push(mailObj.Mail)
  explores.push(mailObj.boxBody)
  exploreMeshes.push(mailObj.Mail)
  exploreKind.push('Wooden')
}
function createFloor(x, z, scale) {
  floorObj = new Floor(boxGeo_floor, floorMat)
  scene.add(floorObj.floor)
  floorObj.floor.position.set(x*scale, -0.495*scale, z*scale)
}
function createWarn(x ,z, scale) {
  warnObj = new Warn(boxGeo_warn, headMaterials_warn, boxShape_warn)
  world.addBody(warnObj.boxBody)
  scene.add(warnObj.Warn)
  warnObj.Warn.position.set(x*scale, 0.6*scale, z*scale)
  warnObj.boxBody.position.set(x*scale, 0.6*scale, z*scale)
  explores.push(warnObj.boxBody)
  exploreMeshes.push(warnObj.Warn)
  exploreKind.push('House')
}
function createBlock(x ,z, scale) {
  blockObj = new Block(blockGeo, downGeo, blockMat, downMat, blockShape)
  world.addBody(blockObj.boxBody)
  scene.add(blockObj.Block)
  blockObj.Block.position.set(x*scale, 0.5*scale, z*scale)
  blockObj.boxBody.position.set(x*scale, 0.5*scale, z*scale)
  boxes.push(blockObj.boxBody)
  boxMeshes.push(blockObj.Block)
  explores.push(blockObj.boxBody)
  exploreMeshes.push(blockObj.Block)
  exploreKind.push('Wooden')
}
function initValley() {
  //LEGO
  legoGeo = new THREE.BoxGeometry(1*scale, 1*scale, 1*scale)
  const upGeo_lego = new THREE.CylinderGeometry(0.15*scale, 0.15*scale, 0.3*scale)
  boxShape_lego = new CANNON.Box(
    new CANNON.Vec3(0.45 * scale, 0.495 * scale, 0.45 * scale)
  )
  let up1 = new THREE.Mesh(upGeo_lego, branchMat)
  up1.position.set(0.25*scale, 0.5*scale, 0.25*scale)
  let up2 = up1.clone()
  up2.position.set(0.25*scale, 0.5*scale, -0.25*scale)
  let up3 = up1.clone()
  up3.position.set(-0.25*scale, 0.5*scale, 0.25*scale)
  let up4 = up1.clone()
  up4.position.set(-0.25*scale, 0.5*scale, -0.25*scale)
  up1.updateMatrix()
  up2.updateMatrix()
  up3.updateMatrix()
  up4.updateMatrix()
  legoGeo.merge(up1.geometry, up1.matrix)
  legoGeo.merge(up2.geometry, up2.matrix)
  legoGeo.merge(up3.geometry, up3.matrix)
  legoGeo.merge(up4.geometry, up4.matrix)
  //HOUSE
  boxGeo_house = new THREE.BoxGeometry(1*scale, 1*scale, 1*scale)
  roofGeo_house = new THREE.BoxGeometry(1*scale, 0.4*scale, 1*scale)
  const upGeo_house = new THREE.BoxGeometry(0.25*scale, 0.3*scale, 0.25*scale)
  let smoke = new THREE.Mesh(upGeo_house, branchMat)
  smoke.position.set(0.25*scale, 0.2*scale, 0)
  smoke.updateMatrix()
  roofGeo_house.merge(smoke.geometry, smoke.matrix)

  const winsowMap = textureLoader.load('./img/window.png')
  const otherMap = textureLoader.load('./img/window_other.png')
  headMaterials_house = []
  for (let i = 0; i < 6; i++) {
    let map
    if (i === 4) map = winsowMap
    else map = otherMap
    headMaterials_house.push(new THREE.MeshPhongMaterial({ map: map }))
  }
  boxShape_house = new CANNON.Box(
    new CANNON.Vec3(0.45 * scale, 0.65 * scale, 0.45 * scale)
  )
  //wooden
  boxGeo_wooden = new THREE.BoxGeometry(1*scale, 1*scale, 1*scale)
  const headMap_wooden = textureLoader.load('./img/box_up.png')
  const skinMap_wooden = textureLoader.load('./img/box_other.png')
  headMaterials_wooden = []
  for (let i = 0; i < 6; i++) {
    let map
    if (i === 2 | i === 3) map = headMap_wooden
    else map = skinMap_wooden
    headMaterials_wooden.push(new THREE.MeshPhongMaterial({ map: map }))
  } 
  boxShape_wooden = new CANNON.Box(
    new CANNON.Vec3(0.45 * scale, 0.5 * scale, 0.45 * scale)
  )
  //tree
  branchGeo = new THREE.CylinderGeometry(0.15*scale, 0.1*scale, 2*scale)
  const leaf2Geo = new THREE.CylinderGeometry(0.35*scale, 0.4*scale, 0.375*scale)
  const leaf3Geo = new THREE.CylinderGeometry(0.25*scale, 0.3*scale, 0.375*scale)
  const leaf4Geo = new THREE.CylinderGeometry(0.15*scale, 0.2*scale, 0.38*scale)
  leafGeo = new THREE.CylinderGeometry(0.45*scale, 0.5*scale, 0.375*scale)
  let leaf2 = new THREE.Mesh(leaf2Geo, branchMat)
  leaf2.position.set(0, (0.0625+0.3125)*scale, 0)
  let leaf3 = new THREE.Mesh(leaf3Geo, branchMat)
  leaf3.position.set(0, (0.4375+0.3125)*scale, 0)
  let leaf4 = new THREE.Mesh(leaf4Geo, branchMat)
  leaf4.position.set(0, (0.8125+0.3125)*scale, 0)
  leaf2.updateMatrix()
  leaf3.updateMatrix()
  leaf4.updateMatrix()
  leafGeo.merge(leaf2.geometry, leaf2.matrix)
  leafGeo.merge(leaf3.geometry, leaf3.matrix)
  leafGeo.merge(leaf4.geometry, leaf4.matrix)
  boxShape_tree = new CANNON.Box(
    new CANNON.Vec3(0.45 * scale, 1 * scale, 0.45 * scale)
  )
  //bush
  boxGeo_bush = new THREE.BoxGeometry(0.2*scale, 0.2*scale, 0.2*scale)
  const zboxGeo_bush = new THREE.BoxGeometry(0.2*scale, 0.2*scale, 0.2*scale)
  const bigGeo_bush = new THREE.BoxGeometry(0.3*scale, 0.3*scale, 0.3*scale)
  const crueGeo_bush = new THREE.BoxGeometry(0.5*scale, 0.5*scale, 0.5*scale)
  
  let bup1 = new THREE.Mesh(zboxGeo_bush, branchMat)
  bup1.position.set(0.35*scale, 0.6*scale, 0.35*scale)
  let bup2 = bup1.clone()
  bup2.position.set(-0.3*scale, 0.5*scale, 0.3*scale)
  let bup3 = bup1.clone()
  bup3.position.set(-0.35*scale, 0.4*scale, 0.25*scale)
  let bup4 = bup1.clone()
  bup4.position.set(0, 0, -0.25*scale)
  let bup5 = bup1.clone()
  bup5.position.set(-0.25*scale, 0.45*scale, -0.25*scale)

  let big1 = new THREE.Mesh(bigGeo_bush, branchMat)
  big1.position.set(0.2*scale, 0.1*scale, 0.2*scale)
  let big2 = big1.clone()
  big2.position.set(-0.2*scale, 0.5*scale, -0.15*scale)
  let big3 = big1.clone()
  big3.position.set(-0.15*scale, -0.1*scale, 0.2*scale)
  let big4 = big1.clone()
  big4.position.set(0.2*scale, 0.2*scale, -0.2*scale)
  let big5 = big1.clone()
  big5.position.set(0.3*scale, 0.15*scale, -0.2*scale)
  let big6 = big1.clone()
  big6.position.set(-0.25*scale, -0.25*scale, 0.25*scale)

  let crue1 = new THREE.Mesh(crueGeo_bush, branchMat)
  crue1.position.set(0, 0, 0)
  let crue2 = crue1.clone()
  crue2.position.set(0.1*scale, 0.4*scale, 0.15*scale)
  let crue3 = crue1.clone()
  crue3.position.set(-0.15*scale, 0.2*scale, 0.1*scale)
  let crue4 = crue1.clone()
  crue4.position.set(-0.1*scale, -0.25*scale, -0.1*scale)
  
  bup1.updateMatrix()
  bup2.updateMatrix()
  bup3.updateMatrix()
  bup4.updateMatrix()
  bup5.updateMatrix()
  boxGeo_bush.merge(bup1.geometry, bup1.matrix)
  boxGeo_bush.merge(bup2.geometry, bup2.matrix)
  boxGeo_bush.merge(bup3.geometry, bup3.matrix)
  boxGeo_bush.merge(bup4.geometry, bup4.matrix)
  boxGeo_bush.merge(bup5.geometry, bup5.matrix)
  big1.updateMatrix()
  big2.updateMatrix()
  big3.updateMatrix()
  big4.updateMatrix()
  big5.updateMatrix()
  big6.updateMatrix()
  boxGeo_bush.merge(big1.geometry, big1.matrix)
  boxGeo_bush.merge(big2.geometry, big2.matrix)
  boxGeo_bush.merge(big3.geometry, big3.matrix)
  boxGeo_bush.merge(big4.geometry, big4.matrix)
  boxGeo_bush.merge(big5.geometry, big5.matrix)
  boxGeo_bush.merge(big6.geometry, big6.matrix)
  crue1.updateMatrix()
  crue2.updateMatrix()
  crue3.updateMatrix()
  crue4.updateMatrix()
  boxGeo_bush.merge(crue1.geometry, crue1.matrix)
  boxGeo_bush.merge(crue2.geometry, crue2.matrix)
  boxGeo_bush.merge(crue3.geometry, crue3.matrix)
  boxGeo_bush.merge(crue4.geometry, crue4.matrix)
}
function createLego(x, y, z, color, scale) {
  const creeperMat_lego = new THREE.MeshPhongMaterial({ color: color })
  legoObj = new Lego(legoGeo, boxShape_lego, creeperMat_lego)
  world.addBody(legoObj.boxBody)
  scene.add(legoObj.lego)
  legoObj.lego.position.set(x*scale, y*scale, z*scale)
  legoObj.boxBody.position.set(x*scale, y*scale, z*scale)
  explores.push(legoObj.boxBody)
  exploreMeshes.push(legoObj.lego)
  exploreKind.push('lego')
}
function createLego_upper(x, y, z, color, scale) {
  const creeperMat_lego = new THREE.MeshPhongMaterial({ color: color })
  legoObj = new Lego(legoGeo, boxShape_lego, creeperMat_lego)
  world.addBody(legoObj.boxBody)
  scene.add(legoObj.lego)
  legoObj.lego.position.set(x*scale, y*scale, z*scale)
  legoObj.boxBody.position.set(x*scale, y*scale, z*scale)
}
function createHouse(x, z, color, scale) {
  const creeperMat_house = new THREE.MeshPhongMaterial({ color: color })
  houseObj = new House(scale, boxGeo_house, roofGeo_house, creeperMat_house, headMaterials_house, boxShape_house)
  world.addBody(houseObj.boxBody)
  scene.add(houseObj.House)
  houseObj.House.position.set(x*scale, 0.705*scale, z*scale)
  houseObj.boxBody.position.set(x*scale, 0.705*scale, z*scale)
  explores.push(houseObj.boxBody)
  exploreMeshes.push(houseObj.House)
  exploreKind.push('House')
}
function createWooden(x ,z, scale) {
  woodenObj = new Wooden(scale, boxGeo_wooden, headMaterials_wooden, boxShape_wooden)
  world.addBody(woodenObj.boxBody)
  scene.add(woodenObj.Wooden)
  woodenObj.Wooden.position.set(x*scale, 0.5*scale, z*scale)
  woodenObj.boxBody.position.set(x*scale, 0.5*scale, z*scale)
  boxes.push(woodenObj.boxBody)
  boxMeshes.push(woodenObj.Wooden)
  explores.push(woodenObj.boxBody)
  exploreMeshes.push(woodenObj.Wooden)
  exploreKind.push('Wooden')
}
function createTree(x ,z, scale) {
  treeObj = new Tree(scale, branchGeo, leafGeo, branchMat, creeperMat_tree, boxShape_tree)
  world.addBody(treeObj.boxBody)
  scene.add(treeObj.Tree)
  treeObj.Tree.position.set(x*scale, 1*scale, z*scale)
  treeObj.boxBody.position.set(x*scale, 1*scale, z*scale)
  explores.push(treeObj.boxBody)
  exploreMeshes.push(treeObj.Tree)
  exploreKind.push('Tree')
}
function createBush(x ,z, scale) {
  bushObj = new Bush(boxGeo_bush, creeperMat_bush)
  scene.add(bushObj.Bush)
  bushObj.Bush.position.set(x*scale, 0.5*scale, z*scale)
  explores.push(bushObj.boxBody)
  exploreMeshes.push(bushObj.Bush)
  exploreKind.push('Bush')
}

function createScene() {
  if (map==0){
    initValley()
    for(let now=0; now<195; now++){
      if(valley[now]==1) createLego(now%15-7, 0.5, Math.floor(now/15)-6, 0xff0000, scale)
      else if(valley[now]==2) createLego(now%15-7, 0.5, Math.floor(now/15)-6, 0xff8800, scale)
      else if(valley[now]==3) createWooden(now%15-7, Math.floor(now/15)-6, scale)
      else if(valley[now]==4) createTree(now%15-7, Math.floor(now/15)-6, scale)
      else if(valley[now]==5) createBush(now%15-7, Math.floor(now/15)-6, scale)
      else if(valley[now]==6) createHouse(now%15-7, Math.floor(now/15)-6, 0xff8800, scale)
      else if(valley[now]==7) createHouse(now%15-7, Math.floor(now/15)-6, 0xfadc2e, scale)
      else if(valley[now]==8) createHouse(now%15-7, Math.floor(now/15)-6, 0x51a7f5, scale)
    }
    for(let i=-7; i<=7; i++){
      for(let j=-6; j<=6; j++){
        if(i<-1 | i>1) createLego_upper(i, -0.495, j, 0x7Eff00, scale)
      }
    }
    createBazzi(-7, -6)
    //createBazzi(-6, 5)
    //createBazzi(6, -5)
  } else if (map==1) {
    initfactory()
    for(let now=0; now<195; now++){
      if(factory[now]==1) createWarn(now%15-7, Math.floor(now/15)-6, scale)
      else if(factory[now]==2) createIron(now%15-7, Math.floor(now/15)-6, 0x57A2F3, scale)
      else if(factory[now]==3) createIron(now%15-7, Math.floor(now/15)-6, 0x87DCFF, scale)
      else if(factory[now]==4) createCol(now%15-7, Math.floor(now/15)-6, scale)
      else if(factory[now]==5) createBlock(now%15-7, Math.floor(now/15)-6, scale)
      else if(factory[now]==6) createCol2(now%15-7, Math.floor(now/15)-6, scale)
      else if(factory[now]==7) createlight(now%15-7, Math.floor(now/15)-6, scale)
      else if(factory[now]==8) createMail(now%15-7, Math.floor(now/15)-6, scale)
    }
    for(let i=-7; i<=7; i++){
      for(let j=-6; j<=6; j++){
        createFloor(i, j, scale)
      }
    }
    createBazzi(-6, -6)
    //createBazzi(-6, 6)
    //createBazzi(6, -6)
  }
  createWall(0, 1)
  createWall(0, -1)
  createWall(1, 1)
  createWall(1, -1)
}

function createWall(IsRotate, x){
  let wallShape = new CANNON.Box(
    new CANNON.Vec3(7.5 * scale, 4 * scale, 0.5 * scale)
  )
  wallBody = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(0, 0, 0)
  })
  wallBody.addShape(wallShape)

  // setFromAxisAngle 旋轉 y 軸 -90 度
  if(IsRotate) wallBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2)
  wallBody.position.set(x*8*IsRotate* scale, 4*scale, x*7*!IsRotate* scale)
  world.add(wallBody)
}