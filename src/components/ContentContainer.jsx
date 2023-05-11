import {motion} from "framer-motion";
const ContentContainer = ({heading, subHeading, doesScroll=false, children}) => {

    return (
        <motion.div
            key={`${heading}-${subHeading}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: .1 }}
            className="content-container"
        >
            <div className="content-heading">
                <h1>{heading}</h1>
                <h2>{subHeading}</h2>
            </div>
            <div className="content" style={{overflowY: doesScroll ? 'auto' : 'hidden'}}>
                {children}
            </div>
        </motion.div>
    )
}

export default ContentContainer