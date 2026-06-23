import React from "react"

const Macbook: React.FC = () => {
  const keyBaseClasses =
    "w-[6px] h-[6px] bg-[#444] float-left m-[1px] rounded-[2px] shadow-[0_-2px_0_#222] macbook-key custom-animate-keys"

  return (
    <div className="macbook-container w-[150px] h-[96px] absolute left-1/2 top-1/2 mt-[-85px] ml-[-78px]">
      <div className="macbook-inner custom-animate-rotate z-20 absolute w-[150px] h-[96px] left-0 top-0">
        <div
          className={`macbook-screen custom-animate-lid-screen w-[150px] h-[96px] absolute left-0 bottom-0 rounded-[7px] bg-[#ddd]
                        bg-[linear-gradient(45deg,rgba(0,0,0,0.34)_0%,rgba(0,0,0,0)_100%)] bg-left-bottom bg-[length:300px_300px]
                        shadow-[inset_0_3px_7px_rgba(255,255,255,0.5)]`}
        >
          <div
            className={`macbook-screen-face-one w-[150px] h-[96px] absolute left-0 bottom-0 rounded-[7px] bg-[#d3d3d3]
                          bg-[linear-gradient(45deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0)_100%)]`}
          >
            <div className="absolute left-1/2 top-[4px] ml-[-1.5px] h-[3px] w-[3px] rounded-full bg-black" />
            <div className="relative m-[10px] h-[74px] w-[130px] rounded-[1px] bg-black bg-[length:100%_100%] shadow-[inset_0_0_2px_rgba(0,0,0,1)]">
              <div
                className={`custom-animate-screen-shade absolute left-0 top-0 h-[74px] w-[130px]
                              bg-[linear-gradient(-135deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.1)_47%,rgba(255,255,255,0)_48%)]
                              bg-[length:300px_200px] bg-[position:0px_0px]`}
              />
            </div>
            <span className="absolute left-[57px] top-[85px] text-[6px] text-[#666]">MacBook Air</span>
          </div>
        </div>

        <div
          className={`macbook-body custom-animate-lid-macbody absolute bottom-0 left-0 h-[96px] w-[150px] rounded-[7px] bg-[#cbcbcb]
                        bg-[linear-gradient(45deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0)_100%)]`}
        >
          <div
            className={`macbook-body-face-one custom-animate-lid-keyboard-area absolute bottom-0 left-0 h-[96px] w-[150px] rounded-[7px] bg-[#dfdfdf]
                          bg-[linear-gradient(30deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0)_100%)]`}
          >
            <div
              className="absolute left-1/2 top-1/2 mt-[-44px] ml-[-18px] h-[31px] w-[40px] rounded-[4px] bg-[#cdcdcd]
                            bg-[linear-gradient(30deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0)_100%)]
                            shadow-[inset_0_0_3px_#888]"
            />
            <div
              className={`macbook-keyboard absolute left-[7px] top-[41px] h-[45px] w-[130px] overflow-hidden rounded-[4px] bg-[#cdcdcd] pl-[2px]
                            bg-[linear-gradient(30deg,rgba(0,0,0,0.24)_0%,rgba(0,0,0,0)_100%)]
                            shadow-[inset_0_0_3px_#777]`}
            >
              {Array.from({ length: 58 }).map((_, i) => (
                <div key={`key-norm-${i}`} className={keyBaseClasses} />
              ))}
              <div key="key-space" className={`${keyBaseClasses} w-[45px]`} />
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={`key-f-${i}`} className={`${keyBaseClasses} h-[3px]`} />
              ))}
            </div>
          </div>
          <div className="absolute left-[20px] top-[20px] h-[5px] w-[5px] rounded-full bg-[#333]" />
          <div className="absolute right-[20px] top-[20px] h-[5px] w-[5px] rounded-full bg-[#333]" />
          <div className="absolute bottom-[20px] right-[20px] h-[5px] w-[5px] rounded-full bg-[#333]" />
          <div className="absolute bottom-[20px] left-[20px] h-[5px] w-[5px] rounded-full bg-[#333]" />
        </div>
      </div>
      <div
        className={`macbook-shadow custom-animate-macbook-shadow absolute left-[40px] top-[160px] h-0 w-[60px]
                      shadow-[0_0_60px_40px_rgba(0,0,0,0.3)]`}
      />
    </div>
  )
}

export { Macbook }
