// 睏寶
//var Bx, Bz;
var counter = 0
class Bazzi {
  constructor(scale_) {
    this.walkOffset = 0
    const headGeo = new THREE.BoxGeometry(0.5*scale_, 0.4*scale_, 0.45*scale_)
    const earGeo = new THREE.BoxGeometry(0.2*scale_, 0.2*scale_, 0.2*scale_)
    const bodyGeo = new THREE.BoxGeometry(0.24*scale_, 0.24*scale_, 0.25*scale_)
    const handGeo = new THREE.BoxGeometry(0.1*scale_, 0.2*scale_, 0.1*scale_)
    const footGeo = new THREE.BoxGeometry(0.12*scale_, 0.15*scale_, 0.1*scale_)

    const textureLoader = new THREE.TextureLoader()
    const headMap = textureLoader.load('./img/face.png')
    const skinMap = textureLoader.load('./img/belly.png')
    const normalMap = textureLoader.load('./img/normal.png')
    const normalMat = new THREE.MeshPhongMaterial({ color: 0xD70000 })

    const headMaterials = []
    const skinMaterials = []
    for (let i = 0; i < 6; i++) {
      let map
      if (i === 4) map = headMap
      else map = normalMap
      headMaterials.push(new THREE.MeshPhongMaterial({ map: map }))
    }

    for (let i = 0; i < 6; i++) {
      let map
      if (i === 4) map = skinMap
      else map = normalMap
      skinMaterials.push(new THREE.MeshPhongMaterial({ map: map }))
    }

    this.head = new THREE.Mesh(headGeo, headMaterials)
    this.head.position.set(0, 0.19*scale_, 0)

    this.body = new THREE.Mesh(bodyGeo, skinMaterials)
    this.body.position.set(0, -0.13*scale_, 0)

    this.ear1 = new THREE.Mesh(earGeo, normalMat)
    this.ear1.position.set(0.25*scale_, 0.35*scale_, -0.225*scale_)
    this.ear2 = this.ear1.clone()
    this.ear2.position.set(-0.25*scale_, 0.35*scale_, -0.225*scale_)

    this.foot1 = new THREE.Mesh(handGeo, normalMat)
    this.foot1.position.set(-0.17*scale_, -0.11*scale_, 0)
    this.foot2 = this.foot1.clone()
    this.foot2.position.set(0.17*scale_, -0.11*scale_, 0)
    this.foot3 = new THREE.Mesh(footGeo, normalMat)
    this.foot3.position.set(0.055*scale_, -0.325*scale_, 0)
    this.foot4 = this.foot3.clone()
    this.foot4.position.set(-0.055*scale_, -0.325*scale_, 0)


    this.ear = new THREE.Group()
    this.ear.add(this.ear1) // 前腳左
    this.ear.add(this.ear2) // 後腳左
    this.feet = new THREE.Group()
    this.feet.add(this.foot1) // 前腳左
    this.feet.add(this.foot2) // 後腳左
    this.feet.add(this.foot3) // 前腳右
    this.feet.add(this.foot4) // 後腳右

    this.Bazzi = new THREE.Group()
    this.Bazzi.add(this.head)
    this.Bazzi.add(this.body)
    this.Bazzi.add(this.feet)
    this.Bazzi.add(this.ear)
    this.Bazzi.name = 'Bazzi'
    /*
    const bodyShape = new CANNON.Box(
      new CANNON.Vec3(0.25 * scale_, 0.4 * scale_, 0.225 * scale_)
    )*/
    const bodyShape = new CANNON.Sphere(0.4)
    this.bodyBody = new CANNON.Body({
      mass: 5,
    })
    this.bodyBody.addShape(bodyShape)
    this.bodyBody.position.set(0, 0.4*scale_, 0)

    this.Bazzi.traverse(function(object) {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
      }
    })
    this.map = []
    this.dir = 4
    this.scale = 0.4*scale_
    this.velocity = 3
    this.bodyBody.velocity.z = this.velocity
    this.positionx = 0
    this.positionz = 0
    this.BazziFirst = false;
    this.BazziFirstAmmo;
    this.alive = true
  }
  putBall(){
    for(var i=0; i < explores.length; i++){
      if (Math.round(exploreMeshes[i].position.z)==Math.round(z) && Math.round(exploreMeshes[i].position.x)==Math.round(x)){
        if (exploreKind[i] == 'Bush') continue
        return
      }
    }

    // 子彈剛體與網格
    const ammoObj = new BazziBall(0.7)
    ammos.push(ammoObj.ammoBody)
    
    this.BazziFirstAmmo = ammoObj
    var x = this.Bazzi.position.x;
    var y = this.Bazzi.position.y;
    var z = this.Bazzi.position.z;

    run(ammoObj, this)

    ammoObj.ammoBody.position.set(Math.round(x), 0.5*scale, Math.round(z))
    ammoObj.ammoMesh.position.set(Math.round(x), 0.5*scale, Math.round(z))

  }
  search(direction){
    var Isok = [0, 0, 0, 0]
    let count = 0
    if ((this.dir+direction)%2!=0){
      var index = (direction%2==0) ? 
                  Math.round(this.bodyBody.position.x)+7 + 15*(Math.round(this.bodyBody.position.z)+6) + (direction-3)*15: 
                  Math.round(this.bodyBody.position.x)+7 + 15*(Math.round(this.bodyBody.position.z)+6) + (direction-2)
      if ( index%15==14 ) Isok[3]=1
      if ( index%15==0 ) Isok[1]=1
      if ( Math.floor(index/15)==12 ) Isok[0]=1
      if ( Math.floor(index/15)==0 ) Isok[2]=1
      for(var i=0; i < exploreMeshes.length; i++){
        var obj = Math.round(exploreMeshes[i].position.x)+7 + 15*(Math.round(exploreMeshes[i].position.z)+6)
        if ( obj==index+1 ) Isok[3]=1
        else if ( obj==index-1 ) Isok[1]=1
        else if ( obj==index+15 ) Isok[0]=1
        else if ( obj==index-15 ) Isok[2]=1
      }
      for (let i=0; i<4; i++) if(Isok[i]) count++
    }
    if(this.BazziFirst == false && !this.BazziFirstAmmo && count!=3){
      this.BazziFirst = true
      this.putBall();
    }
  }
  update(exploreMeshes, ammos) {
    if(!this.alive) {
      this.Bubbling()
      return
    }
    var dir = this.Mapping(exploreMeshes, ammos)
    //這段是在偵測四周哪裡可以走
    if(this.dir == 4){ //向+z方向走的話
      //如果撞牆就會轉彎 或 有5%的機率會在中途轉彎
      if (Math.abs(this.bodyBody.position.z-this.positionz)>0.005 && dir[0] != 2){
        if(Math.random()<0.05){
          //隨機向+x或-x方向走
          if (dir[1]==0 && dir[3]==0){
            if(Math.random()>0.5) this.Turn(1)
            else this.Turn(3)
          }
          else if(dir[1]==0) this.Turn(1)
          else if(dir[3]==0) this.Turn(3)
        }
      }
      else{
        //隨機向+x或-x方向走
        //假設左右皆可走 隨機選擇一邊
        if (dir[1]==0 && dir[3]==0){
          if(Math.random()>0.5) this.Turn(1)
          else this.Turn(3)
        }
        else if(dir[1]==0) this.Turn(1)
        else if(dir[3]==0) this.Turn(3)
        else if(dir[2]==0) this.Turn(2)
      }
    }else if(this.dir == 1){ //向-x方向走的話
      //如果撞牆就會轉彎 或 有5%的機率會在中途轉彎
      if (Math.abs(this.bodyBody.position.x-this.positionx)>0.005 && dir[1] != 2){
        if(Math.random()<0.05){
          if (dir[2]==0 && dir[0]==0){
            if(Math.random()>0.5) this.Turn(2)
            else this.Turn(4)
          }
          else if(dir[2]==0) this.Turn(2)
          else if(dir[0]==0) this.Turn(4)
        }
      }
      else{
        //隨機向+z或-z方向走
        if (dir[2]==0 && dir[0]==0){
          if(Math.random()>0.5) this.Turn(2)
          else this.Turn(4)
        }
        else if(dir[2]==0) this.Turn(2)
        else if(dir[0]==0) this.Turn(4)
        else if(dir[3]==0) this.Turn(3)
      }
    }else if(this.dir == 2){ //向-z方向走的話
      //如果撞牆就會轉彎 或 有5%的機率會在中途轉彎
      if(Math.abs(this.bodyBody.position.z-this.positionz)>0.005 && dir[2] != 2){
        if(Math.random()<0.05){
          if (dir[1]==0 && dir[3]==0){
            if(Math.random()>0.5) this.Turn(1)
            else this.Turn(3)
          }
          else if(dir[1]==0) this.Turn(1)
          else if(dir[3]==0) this.Turn(3)
        }
      }
      else{
        //隨機向+x或-x方向走
        if (dir[1]==0 && dir[3]==0){
          if(Math.random()>0.5) this.Turn(1)
          else this.Turn(3)
        }
        else if(dir[1]==0) this.Turn(1)
        else if(dir[3]==0) this.Turn(3)
        else if(dir[0]==0) this.Turn(4)
      }
    }
    else if(this.dir == 3){ //向+x方向走的話
      //如果撞牆就會轉彎 或 有5%的機率會在中途轉彎
      if(Math.abs(this.bodyBody.position.x-this.positionx)>0.005 && dir[3] != 2){
        if(Math.random()<0.05){
          if (dir[2]==0 && dir[0]==0){
            if(Math.random()>0.5) this.Turn(2)
            else this.Turn(4)
          }
          else if(dir[2]==0) this.Turn(2)
          else if(dir[0]==0) this.Turn(4)
        }
      }
      else{
        //隨機向+z或-z方向走
        if (dir[2]==0 && dir[0]==0){
          if(Math.random()>0.5) this.Turn(2)
          else this.Turn(4)
        }
        else if(dir[2]==0) this.Turn(2)
        else if(dir[0]==0) this.Turn(4)
        else if(dir[1]==0) this.Turn(1)
      }
    }
    this.positionz = this.bodyBody.position.z
    this.positionx = this.bodyBody.position.x
    //Bx = this.bodyBody.position.x
    //Bz = this.bodyBody.position.z
    this.bodyBody.position.y = this.scale //避免睏寶飛起來

    this.bodyBody.velocity.x = (this.dir==1 || this.dir==3) ? (this.dir-2) * this.velocity: 0
    this.bodyBody.velocity.z = (this.dir==2 || this.dir==4) ? (this.dir-3) * this.velocity: 0

    this.BazziFeetWalk()
    this.Bazzi.position.copy(this.bodyBody.position)
  }
  Mapping(exploreMeshes, ammos){
    let dir = [0, 0, 0, 0]//四個方向能不能走
    var index = Math.round(this.bodyBody.position.x)+7 + 15*(Math.round(this.bodyBody.position.z)+6)//目前睏寶所在格數
    //四個if用來檢測旁邊有沒有邊界
    if ( Math.round(this.bodyBody.position.x)+7==14 ) dir[3] = 1
    if ( Math.round(this.bodyBody.position.x)+7==0 ) dir[1] = 1
    if ( Math.round(this.bodyBody.position.z)+6==0 ) dir[2] = 1
    if ( Math.round(this.bodyBody.position.z)+6==12 ) dir[0] = 1
    //用來檢測4週有沒有物品
    for(var i=0; i < exploreMeshes.length; i++){
      var obj = Math.round(exploreMeshes[i].position.x)+7 + 15*(Math.round(exploreMeshes[i].position.z)+6)
      if ( obj==index+1 ) dir[3] = 1
      else if ( obj==index-1 ) dir[1] = 1
      else if ( obj==index+15 ) dir[0] = 1
      else if ( obj==index-15 ) dir[2] = 1
    }
    //用來檢測四周有沒有水球(ammos是我新增的array 在shootingModule中也有改動)
    for(var i=0; i < ammos.length; i++){
      var obj = Math.round(ammos[i].position.x)+7 + 15*(Math.round(ammos[i].position.z)+6)
      if ( obj==index+1 ||obj==index+2 || obj==index+16 || obj==index-14 ) dir[3] = 2
      if ( obj==index-1 || obj==index-2 || obj==index-16 || obj==index+14 ) dir[1] = 2
      if ( obj==index+15 || obj==index+30 || obj==index+16 || obj==index+14) dir[0] = 2
      if ( obj==index-15 || obj==index-30 || obj==index-16 || obj==index-14) dir[2] = 2
    }
    //紀錄目前站立的地方可以走
    this.map[index] = 0
    //紀錄四周可不可以走
    for (let i=1; i<=4; i++) {
      if (i%2) this.map[index+i-2] = dir[i]
      else this.map[index+15*(i-3)] = dir[i%4]
    }
    return dir
  }
  Turn (direction){
    this.search(direction)
    this.Bazzi.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI/2*direction)
    this.dir = direction
  }
  BazziFeetWalk() {
    this.walkOffset += 0.4
    
    this.foot1.rotation.x = Math.sin(this.walkOffset) / 2 // 右手
    this.foot2.rotation.x = -Math.sin(this.walkOffset) / 2 // 左手
    this.foot3.rotation.x = Math.sin(this.walkOffset) / 2 // 左腳
    this.foot4.rotation.x = -Math.sin(this.walkOffset) / 2 // 右腳
  }
  Bubbling() {
    if(!this.bubble) {
      this.bubble = new Ball(1)
      scene.add(this.bubble.ammoMesh)
      this.bubble.ammoMesh.position.copy(this.Bazzi.position)
      this.time = 0
    }
    if(this.time<=250) {
      this.bubble.playAnimation()
      this.walkOffset += 0.8
      this.Bazzi.rotation.x += 0.005
      this.Bazzi.rotation.y += 0.0005
      this.Bazzi.rotation.z += 0.005
      
      this.foot1.rotation.x = Math.sin(this.walkOffset) / 2 // 右手
      this.foot2.rotation.x = -Math.sin(this.walkOffset) / 2 // 左手
      this.foot3.rotation.x = Math.sin(this.walkOffset) / 2 // 左腳
      this.foot4.rotation.x = -Math.sin(this.walkOffset) / 2 // 右腳
      this.time++
    } else if (this.time==251) {
      scene.remove(this.bubble.ammoMesh)
      this.foot1.rotation.x = -Math.PI / 4 // 右手
      this.foot2.rotation.x = -Math.PI / 4 
      this.foot3.rotation.x = -Math.PI / 4 
      this.foot4.rotation.x = -Math.PI / 4 
      this.time++
    } else if (this.time<=310) {
      this.Bazzi.position.y -= 0.005
      this.time++
    } else if (this.time==311)  {
      world.remove(this.bodyBody)
      scene.remove(this.Bazzi)
      this.time++
    }
  }
}

function run(ammoObj, Obj){
  var temp = 0;
  var id = setInterval(async function() { 
    //console.log(temp);
    temp = temp + 1; 
    if(temp == 5){
      scene.add(ammoObj.ammoMesh)
      world.addBody(ammoObj.ammoBody)
    }
    else if(temp == 30){
      Obj.BazziFirst = false
      Obj.BazziFirstAmmo = null
      await check_explore(ammoObj.ammoBody, 'Bazzi')
      var index = ammos.indexOf(ammoObj.ammoBody);
      if (index> -1)
        ammos.splice(index, 1);
      ammoObj.ammoMesh.geometry.dispose()
      world.remove(ammoObj.ammoBody)
      scene.remove(ammoObj.ammoMesh)
      clearInterval(id)
    }
  }, 200);
}
