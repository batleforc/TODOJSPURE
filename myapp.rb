require 'rubygems'
require 'sinatra'
require 'json'


set :public_folder, __dir__ + '/dist/'
set :port, 5001
TODO=[]
Cat=["urgent","perso","pro","admin","unasigned"]

def GetHowMuchToDoForCat(name)
	return TODO.select {|x| x["cat"]==name}
end

get '/' do #redirect to index.html
	send_file File.join(settings.public_folder, 'index.html')
end

get '/TODO' do #read
	return JSON.generate(TODO)
end
get '/CAT' do #Read Caterogie
	return JSON.generate(Cat)
end

get '/Cat/details' do
	return JSON.generate(Cat.map{|cat| {"Cat"=>cat,"Value"=>GetHowMuchToDoForCat(cat).length}})
end

get '/Cat/min' do
	JSON.generate({"Min"=>Cat.map{|cat| GetHowMuchToDoForCat(cat).length}.min})
end

get '/Cat/max' do
	return JSON.generate({"Max"=>Cat.map{|cat| GetHowMuchToDoForCat(cat).length}.max})
end

post "/TODO" do # Create
	request.body.rewind  # in case someone already read it
	if request.body.read.empty?
	'no parameter'
	else
		request.body.rewind
		data = JSON.parse request.body.read
		id=data["content"][0]+TODO.length.to_s
		TODO.push({"content"=>data["content"],"id"=>id,"completed"=>false,"Date"=>Time.new,"cat"=>"unasigned"})
		return JSON.generate({"status"=>"TODO Created"})
	end 
end

put "/TODO/:id" do #EDIT content
	request.body.rewind  # in case someone already read it
	if request.body.read.empty?
	'no parameter'
	else
		request.body.rewind
		data = JSON.parse request.body.read
		ID=params["id"]
		Content= data["content"]
		Index=TODO.find_index {|x| x["id"]==ID}
		return JSON.generate({"error"=>"TODO NOT FOUND"}) if Index==nil
		TODO[Index]["content"]=Content
		return JSON.generate({"status"=>"TODO Edited"})
	end 
end

post "/TODO/:id/check" do #EDIT check
	request.body.rewind  # in case someone already read it
	if request.body.read.empty?
	'no parameter'
	else
		request.body.rewind
		data = JSON.parse request.body.read
		ID=params["id"]
		Content= data["content"]||false
		Index=TODO.find_index {|x| x["id"]==ID}
		return JSON.generate({"error"=>"TODO NOT FOUND"}) if Index==nil
		TODO[Index]["completed"]=Content
		return JSON.generate({"status"=>"TODO Edited"})
	end 
end

post '/TODO/:id/cat' do
	request.body.rewind  # in case someone already read it
	if request.body.read.empty?
	'no parameter'
	else
		request.body.rewind
		data = JSON.parse request.body.read
		ID=params["id"]
		Content= data["cat"]||"unasigned"
		Index=TODO.find_index {|x| x["id"]==ID}
		return JSON.generate({"error"=>"TODO NOT FOUND"}) if Index==nil
		return JSON.generate({"error"=>"Catégorie not found"}) if Cat.find_index {|x| x==Content}==nil
		TODO[Index]["cat"]=Content
		return JSON.generate({"status"=>"TODO Edited"})
	end 
end

delete "/TODO/:id" do #Delete a TODO element by is ID
	ID=params["id"]
	Index=TODO.find_index {|x| x["id"]==ID}
	return JSON.generate({"error"=>"TODO NOT FOUND"}) if Index==nil
	TODO.delete_at(Index)
	return JSON.generate({"status"=>"TODO Removed"})
end
