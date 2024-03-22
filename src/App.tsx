import { useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { easing } from 'maath'

const Colors1 = ['#027bff', '#28a745', '#bd0eaa', '#ffc008']
const Colors2 = ['#dc3545', '#212529', '#bebebe', '#563d7c']

const Shirt = (props: { color: string }) => {
  const [clicked, click] = useState(false)
  const { nodes, materials }: any = useGLTF('/shirtModel.glb')
  useFrame((state, delta) => easing.dampC(materials.lambert1.color, props.color, 0.25, delta))

  return (
    <mesh
      position={[0, 1, 0]}
      scale={clicked ? 6 : 5}
      onClick={(event) => click(!clicked)}
      castShadow
      geometry={nodes.T_Shirt_male.geometry}
      material={materials.lambert1}
      material-roughness={1}
      dispose={null}
    />
  )
}

const App = () => {
  const [SelectedColor, setSelectedColor] = useState(Colors1[0])

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#2191b7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Canvas style={{ width: '50%', height: '100%', backgroundColor: '#fff' }}>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Shirt color={SelectedColor} />
        <OrbitControls
          enablePan={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
      <div style={{ display: 'flex', alignItems: 'stretch', flexDirection: 'row', position: 'absolute', bottom: '20%' }}>
        {Colors1.map((item, index) => (
          <div
            key={index}
            style={{
              width: 50,
              height: 50,
              backgroundColor: item,
              borderRadius: 10,
              marginLeft: 5,
              boxShadow: item === SelectedColor ? 'inset 0px 0px 0px 5px #00ff89' : undefined
            }}
            onClick={() => setSelectedColor(item)}
          ></div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'stretch', flexDirection: 'row', position: 'absolute', bottom: '12%' }}>
        {Colors2.map((item, index) => (
          <div
            key={index}
            style={{
              width: 50,
              height: 50,
              backgroundColor: item,
              borderRadius: 10,
              marginLeft: 5,
              boxShadow: item === SelectedColor ? 'inset 0px 0px 0px 5px #00ff89' : undefined
            }}
            onClick={() => setSelectedColor(item)}
          ></div>
        ))}
      </div>
    </div>
  )
}

useGLTF.preload('/shirtModel.glb')

export default App;