import { useState } from 'react';

const TreeNode: React.FC<{node: any, depth: number}> = ({node, depth}) => {
    const [isOpen, setIsOpen] = useState(node.isOpen);
    const hasChildren = node.children && node.children.length > 0;

    const getClassName = (): string => {
        if (depth === 1) {
            return 'nav-link is-folder';

        } else if (depth === 2) {
            return 'depth-link is-folder'
        } else {
            return 'depth-link is-file'
        }
    }

    return (
        <>
            <li className={`${depth === 1?'nav-items': 'depth-items'}`}>
                <a href="#" onClick={(e) => {e.preventDefault(); setIsOpen(!isOpen); }}
                   className={getClassName()}
                    aria-expanded={isOpen}>
                    <span className="link-inner">
                        <span className="txt-lable">{node.pgmNm}</span>
                    </span>
                </a>
            </li>

            { hasChildren && isOpen &&
                <ul className="depth-list">
                    {
                        node.children && node.children.length > 0 &&
                        node.children.map((child: any) => (
                            <TreeNode key={child.id} node={child} depth={node+1}></TreeNode>
                        ))
                    }

                </ul>
            }

        </>
    );
};

export const TreeView: React.FC<{data: any[]}> = ({data}) => {
    return (
        <>
            {
                data.map((item: any) => (
                <TreeNode key={item.id} node={item} depth={1}></TreeNode>
            ))}
        </>
    )
};