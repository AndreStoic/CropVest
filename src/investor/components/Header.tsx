import React from "react";

interface IHeaderProps {
  title: string;
  description?: string;
}

class Header extends React.Component<IHeaderProps> {
  render() {
    return (
      <>
        {/* Title */}
        <div className="text-center mb-4">
          <h1 className="font-bold text-4xl inline text-transparent bg-clip-text bg-black">
            {this.props.title}
          </h1>
        </div>
        {/* Description */}
        {this.props.description && (
          <p className="sm:max-w-lg mx-auto mb-6 text-center">
            {this.props.description}
          </p>
        )}
      </>
    );
  }
}

export default Header;
