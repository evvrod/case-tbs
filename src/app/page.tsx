import styles from './page.module.css';

export default function Page() {
  return (
    <>
      <h2 className={styles.title}>Description</h2>
      <p className={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis facilisis
        hendrerit velit, vitae lacinia nisl elementum vel. Morbi quis tristique
        eros. Pellentesque nec commodo ligula. Fusce pretium efficitur erat at
        tempor. Morbi a nulla at sem molestie euismod. Ut elementum lobortis
        justo ac euismod. Donec eu molestie nisi, a pharetra nunc. Ut a nibh
        ante. Quisque sed lorem fermentum, rhoncus velit ut, finibus sem. In
        imperdiet sapien sed odio faucibus mattis. Proin tristique, turpis a
        congue dignissim, enim metus gravida mauris, quis dapibus nulla diam id
        sapien. Praesent accumsan lectus sed placerat fringilla. Nulla ut odio
        ac metus faucibus porta non a diam. Orci varius natoque penatibus et
        magnis dis parturient montes, nascetur ridiculus mus. Quisque venenatis
        porta lorem, eu faucibus nulla ultricies eu.
      </p>
      <p className={styles.text}>
        Etiam efficitur odio eget tincidunt ultrices. Cras congue, metus vel
        vulputate fermentum, velit quam ornare sem, quis hendrerit magna neque
        vitae tellus. Donec ultrices mi vitae enim ullamcorper pharetra. Cras
        pretium ut magna iaculis aliquam. Curabitur interdum dapibus metus, vel
        consequat nisl. Donec bibendum tincidunt ornare. Ut at dignissim purus.
        Praesent convallis ornare mollis. Praesent mollis eros quis massa
        accumsan fringilla. Sed in dolor eget nunc venenatis finibus. Donec non
        aliquet tellus, luctus venenatis ante.
      </p>
    </>
  );
}
